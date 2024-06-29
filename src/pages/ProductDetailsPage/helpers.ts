import { getAllProducts } from "../../api/productApi";
import { Product } from "../../types/product";

export async function getSuggestedProducts() {
  const products = await getAllProducts<Product[]>();

  return products.filter(el => el.capacity.includes('512'));
}