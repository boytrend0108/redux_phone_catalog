import './PhonesPage.scss';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/product';
import { SortParams } from '../../types/select';
import { getPhones } from '../../api/productApi';
import { MyLoader } from '../../components/UI/MyLoader';

function getPreparedProducts(
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

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const query = searchParams.get('query') || '';

  const sortBy = (searchParams.get('sort') || 'age') as SortParams;
  const preparedPhones = getPreparedProducts(phones, { sortBy, query });
  const phonesQuantity = phones.length;

  useEffect(() => {
    getPhones<Product>()
      .then(setPhones)
      .catch(() => setErrorMessage('Something went wrong...'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="phones-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>

        <h1 className="phones-page__title">Mobile phones</h1>

        <p className="phones-page__counter">{`${phonesQuantity} models`}</p>
      </header>

      <main>
        {loading
          ? (<MyLoader />)
          : (
            <>
              {query && !preparedPhones.length
                ? <p>There are no phones with such parameters</p>
                : <ProductList products={preparedPhones} />}

              {errorMessage && <h2>{errorMessage}</h2>}
            </>
          )}
      </main>
    </div>
  );
};
