interface Product {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
}

const _products: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    category: 'Electronics',
    likes: 120,
    dislikes: 10,
  },
  {
    id: '2',
    title: 'Organic Green Tea',
    category: 'Food & Beverage',
    likes: 45,
    dislikes: 3,
  },
  {
    id: '3',
    title: 'Leather Messenger Bag',
    category: 'Fashion',
    likes: 22,
    dislikes: 12,
  },
  {
    id: '4',
    title: 'Bluetooth Portable Speaker',
    category: 'Electronics',
    likes: 4,
    dislikes: 0,
  },
  {
    id: '5',
    title: 'Natural Bamboo Toothbrush',
    category: 'Health & Wellness',
    likes: 10,
    dislikes: 2,
  },
  {
    id: '6',
    title: 'Stainless Steel Water Bottle',
    category: 'Home',
    likes: 55,
    dislikes: 4,
  },
  {
    id: '7',
    title: 'Fitness Tracker Watch',
    category: 'Sports',
    likes: 70,
    dislikes: 6,
  },
  {
    id: '8',
    title: 'Cozy Throw Blanket',
    category: 'Home',
    likes: 40,
    dislikes: 3,
  },
  {
    id: '9',
    title: 'Gourmet Chocolate Box',
    category: 'Food & Beverage',
    likes: 65,
    dislikes: 7,
  },
  {
    id: '10',
    title: 'Wireless Charging Pad',
    category: 'Electronics',
    likes: 90,
    dislikes: 9,
  },
  {
    id: '11',
    title: 'Leather Wallet',
    category: 'Fashion',
    likes: 50,
    dislikes: 4,
  },
  {
    id: '12',
    title: 'Plant-Based Protein Powder',
    category: 'Health & Wellness',
    likes: 35,
    dislikes: 2,
  },
  {
    id: '13',
    title: 'Retro Vinyl Record Player',
    category: 'Entertainment',
    likes: 75,
    dislikes: 6,
  },
  {
    id: '14',
    title: 'Scented Soy Candle',
    category: 'Home',
    likes: 25,
    dislikes: 1,
  },
  {
    id: '15',
    title: 'Smartphone Camera Lens Kit',
    category: 'Electronics',
    likes: 4,
    dislikes: 7,
  },
];

export const products: Promise<Product[]> = new Promise((resolve, reject) =>
  setTimeout(resolve, 100, _products),
);
