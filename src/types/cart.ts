import { CategoryName } from "./product";

export type CartItemType = {
  id: string;
  name: string;
  images: string[];
  priceRegular: number,
  priceDiscount: number,
  quantity: number;
  capacity: string;
  ram: string;
  category: CategoryName,
};

export type Cart = CartItemType[];
