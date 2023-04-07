export interface iImages {
  url: string,
  alt: string
}
export interface iCategory {
  _id: string,
  name: string
}
export interface iProduct {
  _id: string;
  name: string;
  price: number;
  images: iImages[];
  description: string;
  categories: iCategory[];
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  deletedAt: Date | null;
}