import { Product } from "../types/product";
import { SortParams } from "../types/select";

export function getPreparedProducts(
  products: Product[],
  { sortBy, query }: { sortBy: SortParams, query?: string },
) {
  const preparedProducts = [...products];

  preparedProducts.sort((product1, product2) => {
    switch (sortBy) {
      case 'age': {
        const model1 = product1.name.match(/\d+/);
        const model2 = product2.name.match(/\d+/);

        if (!model1 || !model2) {
          return 0;
        }

        return +model2[0] - +model1[0];
      }

      case 'name':
        return product1.name.toLowerCase()
          .localeCompare(product2.name.toLowerCase());

      case 'price':
        return product1.priceDiscount - product2.priceDiscount;

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