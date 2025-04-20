export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  modelUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  popular: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    category: 'furniture',
    description: 'Premium ergonomic office chair with adjustable lumbar support and breathable mesh back. Perfect for long work sessions with ultimate comfort.',
    features: [
      'Adjustable height and armrests',
      'Breathable mesh back',
      'Lumbar support',
      '360° swivel',
      'Premium casters for smooth movement'
    ],
    modelUrl: '/models/chair.glb',
    images: [
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
      'https://images.pexels.com/photos/116915/pexels-photo-116915.jpeg'
    ],
    rating: 4.8,
    reviewCount: 245,
    stock: 25,
    popular: true
  },
  {
    id: '2',
    name: 'Modern Coffee Table',
    price: 199.99,
    category: 'furniture',
    description: 'Elegant coffee table with minimalist design and tempered glass top. The perfect centerpiece for your living room.',
    features: [
      'Tempered glass top',
      'Solid wood legs',
      'Modern design',
      'Easy assembly',
      'Stain-resistant finish'
    ],
    modelUrl: '/models/table.glb',
    images: [
      'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    rating: 4.6,
    reviewCount: 189,
    stock: 18,
    popular: true
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Headphones',
    price: 159.99,
    category: 'electronics',
    description: 'Premium wireless headphones with active noise cancellation and up to 30 hours of battery life.',
    features: [
      'Active noise cancellation',
      '30-hour battery life',
      'Quick charging',
      'Premium sound quality',
      'Comfortable over-ear design'
    ],
    modelUrl: '/models/headphones.glb',
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg',
      'https://images.pexels.com/photos/1591/technology-music-sound-things.jpg'
    ],
    rating: 4.9,
    reviewCount: 312,
    stock: 42,
    popular: true
  },
  {
    id: '4',
    name: 'Smartphone Pro Max',
    price: 999.99,
    category: 'electronics',
    description: 'The latest flagship smartphone with state-of-the-art camera system and all-day battery life.',
    features: [
      '6.7" Super Retina display',
      'Triple camera system',
      'Face ID',
      'All-day battery life',
      'Water and dust resistant'
    ],
    modelUrl: '/models/phone.glb',
    images: [
      'https://images.pexels.com/photos/4068379/pexels-photo-4068379.jpeg',
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
    ],
    rating: 4.7,
    reviewCount: 528,
    stock: 15,
    popular: true
  },
  {
    id: '5',
    name: 'Designer Watch',
    price: 349.99,
    category: 'fashion',
    description: 'Elegant designer watch with premium materials and automatic movement. The perfect accessory for any occasion.',
    features: [
      'Automatic movement',
      'Sapphire crystal',
      'Genuine leather strap',
      'Water-resistant to 100m',
      'Luminous hands and markers'
    ],
    modelUrl: '/models/watch.glb',
    images: [
      'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg',
      'https://images.pexels.com/photos/9979804/pexels-photo-9979804.jpeg',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'
    ],
    rating: 4.5,
    reviewCount: 156,
    stock: 22,
    popular: true
  },
  {
    id: '6',
    name: 'Leather Messenger Bag',
    price: 129.99,
    category: 'accessories',
    description: 'Handcrafted leather messenger bag with plenty of compartments for all your daily essentials.',
    features: [
      'Genuine full-grain leather',
      'Multiple compartments',
      'Adjustable shoulder strap',
      'Fits up to 15" laptop',
      'Brass hardware'
    ],
    modelUrl: '/models/bag.glb',
    images: [
      'https://images.pexels.com/photos/1895534/pexels-photo-1895534.jpeg',
      'https://images.pexels.com/photos/1391038/pexels-photo-1391038.jpeg',
      'https://images.pexels.com/photos/6475049/pexels-photo-6475049.jpeg'
    ],
    rating: 4.4,
    reviewCount: 98,
    stock: 17,
    popular: false
  },
  {
    id: '7',
    name: 'Minimalist Desk Lamp',
    price: 79.99,
    category: 'furniture',
    description: 'Modern desk lamp with adjustable arm and touch-sensitive controls. Perfect for your home office.',
    features: [
      'Touch-sensitive controls',
      'Adjustable arm',
      'Multiple lighting modes',
      'USB charging port',
      'Energy-efficient LED'
    ],
    modelUrl: '/models/lamp.glb',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
      'https://images.pexels.com/photos/3637740/pexels-photo-3637740.jpeg',
      'https://images.pexels.com/photos/205405/pexels-photo-205405.jpeg'
    ],
    rating: 4.3,
    reviewCount: 76,
    stock: 31,
    popular: false
  },
  {
    id: '8',
    name: 'Smart Home Speaker',
    price: 129.99,
    category: 'electronics',
    description: 'Intelligent smart home speaker with premium sound quality and voice assistant integration.',
    features: [
      'Voice control',
      'Multi-room audio',
      'Smart home integration',
      'High-definition audio',
      'Compact design'
    ],
    modelUrl: '/models/speaker.glb',
    images: [
      'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg',
      'https://images.pexels.com/photos/4009407/pexels-photo-4009407.jpeg',
      'https://images.pexels.com/photos/12938826/pexels-photo-12938826.jpeg'
    ],
    rating: 4.6,
    reviewCount: 203,
    stock: 27,
    popular: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category?: string): Product[] => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.popular);
};