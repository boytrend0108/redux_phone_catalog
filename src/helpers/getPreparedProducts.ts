import { Product } from "../types/product";
import { SortParams } from "../types/select";

export function getPreparedProducts(
  products: Product[],
  { sortBy, query }: { sortBy: SortParams, query?: string },
) {
  const preparedProducts = [...products];

  preparedProducts.sort((product1, product2) => {
    switch (sortBy) {
      case 'age':
        return product2.year - product1.year;
      case 'name':
        return product1.name.toLowerCase()
          .localeCompare(product2.name.toLowerCase());
      case 'price':
        return product1.price - product2.price;
      default:
        return 0;
    }
  });

  if (query) {
    return preparedProducts
      .filter(el => el.name.toLowerCase().includes(query.toLowerCase()));
  }

  return preparedProducts;
}