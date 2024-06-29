import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { SortParams } from '../../types/select';
import { MyLoader } from '../../components/UI/MyLoader';
import { ProductList } from '../../components/ProductList';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { getAccessories } from '../../api/productApi';

export const AccessoriesPage = () => {
  const [searchParams] = useSearchParams();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const query = searchParams.get('query') || '';

  const sortBy = (searchParams.get('sort') || 'age') as SortParams;
  const preparedAccessories = getPreparedProducts(accessories, { sortBy, query });
  const phonesQuantity = accessories.length;

  useEffect(() => {
    getAccessories<Product>()
      .then(setAccessories)
      .catch(() => setErrorMessage('Something went wrong...'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="cart-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>

        <h1 className="phones-page__title">Accessories</h1>

        <p className="phones-page__counter">{`${phonesQuantity} models`}</p>
      </header>

      <main>
        {loading
          ? (<MyLoader />)
          : (
            <>
              {query && !preparedAccessories.length
                ? <p>There are no phones with such parameters</p>
                : <ProductList products={preparedAccessories} />}

              {errorMessage && <h2>{errorMessage}</h2>}
            </>
          )}
      </main>
    </section>
  );
};
