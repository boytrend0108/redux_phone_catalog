import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import './ProductDetailsPage.scss';
import { CategoryName, Product } from '../../types/product';
import { getAccessories, getAllProducts, getPhones, getTablets } from '../../api/productApi';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { MyLoader } from '../../components/UI/MyLoader';
import { ProductDetails } from '../../components/ProductDetails';
import { ProductSlider } from '../../components/ProductsSlider';
import { MyBackLink } from '../../components/UI/MyBackLink';
import { useAppDispatch } from '../../app/hooks';
import { productAction } from '../../features/phones/phonesSlice';
import { getSuggestedProducts } from './helpers';



export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  // const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [errorSuggested, setErrorSuggested] = useState('');
  const { pathname } = useLocation();
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const suggestedProducts = useRef<Product[]>([]);

  if (!product) {
    setErrorMessage('There is no data for this product...');
  }

  async function fetchProducts() {
    const category = pathname.split('/')[1] as CategoryName;

    switch (category) {
      case CategoryName.phone: {
        getPhones<Product>()
          .then((res) => {
            dispatch(productAction.setProducts(res))
            setProducts(res)
          })
          .catch(() => setErrorMessage('Something went wrong...'))
          .finally(() => setLoading(false));

        break;
      }

      case CategoryName.tablet:
        getTablets<Product>()
          .then((res) => {
            dispatch(productAction.setProducts(res))
            setProducts(res)
          })
          .catch(() => setErrorMessage('Something went wrong...'))
          .finally(() => setLoading(false));
        break;

      case CategoryName.accessory:
        getAccessories<Product>()
          .then((res) => {
            dispatch(productAction.setProducts(res))
            setProducts(res)
          })
          .catch(() => setErrorMessage('Something went wrong...'))
          .finally(() => setLoading(false));
        break;

      default:
        setErrorMessage('Category not found...')
    }
  }

  useEffect(() => {
    setErrorMessage('');

    if (!productId) {
      return;
    }

    fetchProducts()
      .then(() => {
        setErrorMessage('')
        const product = products?.find(el => el.id === productId);

        if (product) {
          setProduct(product);
        } else {
          setErrorMessage('Something went wrong...')
        }
      })

    if (!suggestedProducts.current.length) {
      getSuggestedProducts()
        .then((res) => suggestedProducts.current = res)
        .catch(() => setErrorSuggested('Something went wrong...'))
        .finally(() => setLoading(false));
    }
  }, [productId, products.length]);


  return (
    <div className="product-details">
      <header className="product-details__header">
        <div className="product-details__breadcrumbs" data-cy="breadCrumbs">
          <BreadCrumbs />
        </div>

        <MyBackLink />

        <h1 className="product-details__title">
          {product?.name}
        </h1>
      </header>

      <main className="product-details__main">
        {loading
          ? <MyLoader />
          : (
            <>
              {!errorMessage
                ? <ProductDetails product={product} />
                : <>
                  <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Product not found</h2>
                  <img
                    src="img/product-not-found.png"
                    width={300} height={300}
                    style={{ margin: '0 auto', display: 'block' }}
                  />
                </>
              }
            </>
          )}
      </main>

      <footer className="product-details__footer">
        <h2 className="product-details__title">You may also like</h2>

        {errorSuggested
          ? <p>{errorSuggested}</p>
          : <ProductSlider products={suggestedProducts.current} />}
      </footer>
    </div>
  );
};
