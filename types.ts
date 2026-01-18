
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
}

export interface Course {
  id: string; // Updated to string for custom Google Sheets IDs
  title: string;
  category: string;
  price: number;
  type: 'Online' | 'Presencial' | 'Híbrido';
  description: string;
  image: string;
  linhaOriginal?: number;
  vagas?: number;
  url?: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  month: string;
  location: string;
  time: string;
  type: 'Presencial' | 'Online';
}
