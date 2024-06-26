import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { useEffect, useState } from 'react';
import { MyLoader } from '../../components/UI/MyLoader';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { SortParams } from '../../types/select';
import { Product } from '../../types/product';
import { ProductList } from '../../components/ProductList';
import { getTablets } from '../../api/productApi';

export const TabletsPage = () => {
  const [searchParams] = useSearchParams();
  const [tablets, setTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const query = searchParams.get('query') || '';

  const sortBy = (searchParams.get('sort') || 'age') as SortParams;
  const preparedTablets = getPreparedProducts(tablets, { sortBy, query });
  const tabletsQuantity = tablets.length;

  useEffect(() => {
    getTablets<Product>()
      .then(setTablets)
      .catch(() => setErrorMessage('Something went wrong...'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="cart-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>

        <h1 className="phones-page__title">Tablets</h1>

        <p className="phones-page__counter">{`${tabletsQuantity} models`}</p>
      </header>

      <main>
        {loading
          ? (<MyLoader />)
          : (
            <>
              {query && !preparedTablets.length
                ? <p>There are no phones with such parameters</p>
                : <ProductList products={preparedTablets} />}

              {errorMessage && <h2>{errorMessage}</h2>}
            </>
          )}
      </main>
    </section>
  );
};
