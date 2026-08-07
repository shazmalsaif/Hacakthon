import { HfInference } from '@huggingface/inference';
import type { Product } from '../data/products';

export interface HuggingFaceChatResponse {
  text: string;
  recommendedProductIds: string[];
}

export async function askHuggingFaceAssistant(
  userMessage: string,
  catalog: Product[],
  customApiKey?: string
): Promise<HuggingFaceChatResponse> {
  const apiKey = customApiKey || import.meta.env.VITE_HUGGINGFACE_API_KEY || '';

  if (!apiKey || apiKey.includes('YOUR_HUGGINGFACE_API_KEY')) {
    throw new Error('Hugging Face API key is missing or invalid');
  }

  const catalogJson = JSON.stringify(
    catalog.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      tags: p.tags,
      image: p.image,
    })),
    null,
    2
  );

  // Requirement #5 System Prompt
  const systemPrompt = `You are a shopping assistant for Fun Gadgets, an e-commerce store. Here is the full product catalog: ${catalogJson}. When the user describes what they're looking for, recommend 1–2 matching products from this catalog only. Never invent products. Reply with a short, friendly explanation and clearly state the recommended product ID(s) so the UI can render product cards.`;

  const modelName = 'deepseek-ai/DeepSeek-V4-Pro';
  let responseContent = '';

  try {
    const hf = new HfInference(apiKey);
    const chatRes = await hf.chatCompletion({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    responseContent = chatRes.choices[0]?.message?.content || '';
  } catch (chatError) {
    console.warn('HF SDK call error, trying fallback endpoint:', chatError);

    const response = await fetch(`https://router.huggingface.co/hf-inference/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const directRes = await fetch(`https://api-inference.huggingface.co/models/${modelName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `${systemPrompt}\n\nUser: ${userMessage}\nAssistant:`,
          parameters: { max_new_tokens: 500 },
        }),
      });

      if (!directRes.ok) {
        throw new Error(`Hugging Face API error with status ${directRes.status}`);
      }

      const data = await directRes.json();
      if (Array.isArray(data) && data[0]?.generated_text) {
        responseContent = data[0].generated_text
          .replace(`${systemPrompt}\n\nUser: ${userMessage}\nAssistant:`, '')
          .trim();
      } else {
        responseContent = typeof data === 'string' ? data : JSON.stringify(data);
      }
    } else {
      const data = await response.json();
      responseContent = data.choices?.[0]?.message?.content || '';
    }
  }

  if (!responseContent) {
    throw new Error('Empty response received from Hugging Face model');
  }

  // Extract recommended product IDs
  const recommendedProductIds = catalog
    .filter(
      (p) =>
        responseContent.toLowerCase().includes(p.id.toLowerCase()) ||
        responseContent.toLowerCase().includes(p.name.toLowerCase())
    )
    .map((p) => p.id)
    .slice(0, 2);

  return {
    text: responseContent,
    recommendedProductIds,
  };
}
