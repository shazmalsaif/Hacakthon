const API_URL = "https://store-rag-assistantbackend.vercel.app";

export interface ChatResponse {
  answer: string;
}

export async function askRAG(
  message: string,
  threadId: string = "default"
): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      thread_id: threadId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `RAG API error ${response.status}: ${errorText}`
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("answer" in data) ||
    typeof data.answer !== "string"
  ) {
    throw new Error("Invalid response from RAG API");
  }

  return data as ChatResponse;
}