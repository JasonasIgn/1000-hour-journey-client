export interface ShopItem {
  id: number;
  title: string;
  description: string;
  cost: number;
  timesPurchased: number;
  createdAt: Date;
  updatedAt: Date;
  mediaUrl?: string;
}
