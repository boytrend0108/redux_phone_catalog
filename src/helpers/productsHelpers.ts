import { Product } from '../types/product';

export function getBrandNewProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.capacity === '128GB')
    .sort((product1, product2) => product2.priceDiscount - product1.priceDiscount)
    .slice(0, 22);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  const sorted = [...products]
    .sort((product1, product2) => {
      const discount1 = (product1.priceRegular - product1.priceDiscount);
      const discount2 = (product2.priceRegular - product2.priceDiscount);

      return discount2 - discount1;
    })
    .slice(0, 22);

  return sorted;
}
