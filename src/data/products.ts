export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Home' | 'Workspace' | 'Living' | 'Lighting' | 'Audio' | 'Hydration';
  price: number;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  features?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'minimalist-desk-lamp',
    name: 'Minimalist Desk Lamp',
    subtitle: 'Adjustable light temperature and brightness',
    category: 'Lighting',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Elevate your workspace with this ultra-sleek desk lamp. Featuring intuitive touch controls for seamless brightness adjustment and color warmth control so that glare is never an issue. Modern minimalist architectural style provides flicker-free, eye-caring illumination for late night productivity.',
    tags: ['lighting', 'desk', 'workspace', 'lamp', 'study', 'led', 'dimmable', 'minimalist'],
    rating: 4.8,
    reviewsCount: 124,
    features: ['Touch Sensitivity Control', '3 Color Temperatures', 'Auto Off Timer', 'Flicker-Free LED']
  },
  {
    id: 'smart-coffee-mug',
    name: 'Smart Coffee Mug',
    subtitle: 'Keeps your drink at 135°F all day long',
    category: 'Home',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Never drink cold coffee or lukewarm tea again. Designed for home office workers and coffee connoisseurs, this smart ceramic coffee mug allows you to set your precise drinking temperature via companion app or quick base control. Keeps beverages hot for 3+ hours or all day on the charging coaster.',
    tags: ['coffee', 'mug', 'heating', 'drink', 'beverage', 'hot', 'kitchen', 'workspace', 'smart'],
    rating: 4.9,
    reviewsCount: 208,
    features: ['Precision Temp Control (120°F - 145°F)', 'Charging Coaster Included', 'Submersible Waterproof', 'Auto-Sleep Sensor']
  },
  {
    id: 'portable-wireless-speaker',
    name: 'Portable Wireless Speaker',
    subtitle: '360-degree sound with 24-hour battery life',
    category: 'Audio',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse your space in crystal clear 360° high-fidelity audio. Engineered with dual passive radiators for deep punchy bass and clean highs. IPX7 waterproof rating ensures it handles poolside hangs or desk jams effortlessly with an astounding 24-hour continuous playtime.',
    tags: ['audio', 'speaker', 'bluetooth', 'music', 'portable', 'outdoor', 'waterproof', 'sound'],
    rating: 4.7,
    reviewsCount: 95,
    features: ['IPX7 Waterproof', '24-Hour Battery', '360° Surround Sound', 'Bluetooth 5.3 Quick Pair']
  },
  {
    id: 'pro-ergonomic-mouse',
    name: 'Pro Ergonomic Mouse',
    subtitle: 'Ultra-lightweight with precision tracking',
    category: 'Workspace',
    price: 39.50,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    description: 'Reduce wrist strain and elevate your daily workflow with the Pro Ergonomic Wireless Mouse. Designed based on palm contours with tactile whisper-quiet switches, hyper-scroll thumb wheel, and a high-precision 26k DPI sensor.',
    tags: ['workspace', 'mouse', 'ergonomic', 'desk', 'tech', 'computer', 'productivity', 'wireless'],
    rating: 4.6,
    reviewsCount: 78,
    features: ['Ergonomic Palm Support', 'Silent Click Technology', 'Multi-Device Pairing', 'Fast USB-C Recharge']
  },
  {
    id: 'smart-thermal-water-bottle',
    name: 'Smart Thermal Water Bottle',
    subtitle: 'UV self-cleaning & hydration tracking',
    category: 'Hydration',
    price: 42.50,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Stay hydrated with fresh, pure water wherever you go. The cap features an integrated UV-C light that purifies water and sanitizes the bottle interior every 2 hours. Touch the LED lid to view your water temperature and track daily drinking reminders.',
    tags: ['hydration', 'water', 'bottle', 'fitness', 'travel', 'clean', 'health', 'smart'],
    rating: 4.9,
    reviewsCount: 164,
    features: ['UV-C Self Purifying Cap', '24h Cold / 12h Hot Insulation', 'LED Temp Display', 'Hourly Hydration Alerts']
  },
  {
    id: 'fast-charging-pad',
    name: 'Smart Fast Charging Pad',
    subtitle: '15W Wireless Qi charging with leather finish',
    category: 'Workspace',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1586816879360-e018dfb3c915?auto=format&fit=crop&w=800&q=80',
    description: 'Streamline your nightstand or workspace layout. Premium weighted base wrapped in vegan leather delivers up to 15W high-speed wireless charging for smartphones and earbud cases without cluttering cables.',
    tags: ['charging', 'phone', 'desk', 'wireless', 'workspace', 'power', 'fast charge'],
    rating: 4.5,
    reviewsCount: 89,
    features: ['15W Fast Qi Charge', 'Foreign Object Detection', 'Soft Leather Surface', 'Low-profile LED Indicator']
  },
  {
    id: 'anc-wireless-headphones',
    name: 'Aero ANC Headphones',
    subtitle: 'Hybrid active noise cancellation & spatial audio',
    category: 'Audio',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Block out distractions and dive into deep sound with Aero ANC Headphones. Custom 40mm drivers deliver rich low end and expansive acoustic clarity. Features memory foam ear cushions for zero fatigue during extended study or work sessions.',
    tags: ['audio', 'headphones', 'anc', 'noise cancellation', 'music', 'travel', 'spatial audio'],
    rating: 4.8,
    reviewsCount: 310,
    features: ['Hybrid Active Noise Cancellation', '40h Battery Life', 'Ultra Soft Memory Foam', 'Multipoint Connectivity']
  },
  {
    id: 'rgb-ambient-bar-light',
    name: 'RGB Smart Ambient Light',
    subtitle: 'Syncs with music & screen display colors',
    category: 'Lighting',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Transform your room atmosphere with dynamic RGB lighting. Features smart ambient light sensing, music audio sync mode, and over 16 million colors to match your gaming setup, movie night, or relaxation mood.',
    tags: ['lighting', 'rgb', 'gaming', 'desk', 'smart', 'atmosphere', 'room', 'ambient'],
    rating: 4.7,
    reviewsCount: 142,
    features: ['16 Million Colors', 'Audio Rhythm Sync Mode', 'App & Voice Control', 'Dual Position Stand']
  },
  {
    id: 'air-purifier-mini',
    name: 'Smart Air Purifier Mini',
    subtitle: 'True HEPA filter for desk & bedside air quality',
    category: 'Living',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    description: 'Breathe cleaner air while working or sleeping. Dual filtration system captures 99.97% of airborne allergens, dust, smoke, and odors. Ultra-quiet sleep mode runs at just 22dB.',
    tags: ['living', 'air', 'purifier', 'home', 'clean', 'hepa', 'health', 'smart'],
    rating: 4.8,
    reviewsCount: 116,
    features: ['3-Stage True HEPA Filter', '22dB Silent Sleep Mode', 'Air Quality PM2.5 Sensor', 'Aromatherapy Pad']
  }
];
