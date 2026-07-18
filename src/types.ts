export interface MenuItem {
  id: string;
  name: string;
  koreanName: string;
  price: string;
  description: string;
  category: 'coffee' | 'signature' | 'dessert' | 'non-coffee';
  imageUrl: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
}
