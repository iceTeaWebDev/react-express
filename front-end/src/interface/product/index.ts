export interface iProduct {
    _id: string;
  name: string;
  price: number;
  quality: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  deletedAt: Date | null;
}