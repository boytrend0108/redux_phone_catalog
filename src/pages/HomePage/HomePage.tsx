import {useEffect, useState } from 'react';

import './HomePage.scss';
import { ProductSlider } from '../../components/ProductsSlider';
import { Slider } from '../../components/Slider';
import { Category, Product } from '../../types/product';
import { CategoryItem } from '../../components/CategoryItem';
import { MyLoader } from '../../components/UI/MyLoader';

import { categories } from '../../api/category/category';

import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/productsHelpers';
import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const { phones, loading, error } = useAppSelector(state => state.phones)

  useEffect(() => {
    setNewProducts(getBrandNewProducts(phones));
    setHotProducts(getHotPriceProducts(phones));
  }, [phones]);

  return (
    <div className="homepage">
      <h1 className="visually-hidden">Home Page</h1>

      <section className="homepage__slider homepage__section">
        <Slider />
      </section>

      <section className="homepage__hot homepage__section">
        <h2 className="homepage__section-title">Hot prices</h2>
        {loading
          ? <MyLoader />
          : (
            <>
              {error
                ? <h3>{error}</h3>
                : <ProductSlider products={hotProducts} />}
            </>
          )}
      </section>

      <section className="homepage__section">
        <h2 className="homepage__section-title">Shop by category</h2>

        <div
          className="homepage__categories"
          data-cy="categoryLinksContainer"
        >
          {categories.map((category: Category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="homepage__section">
        <h2 className="homepage__section-title">Brand new models</h2>
        {loading
          ? <MyLoader />
          : (
            <>
              {error
                ? <h3>{error}</h3>
                : <ProductSlider products={newProducts} sliderName="new" />}
            </>
          )}
      </section>
    </div>
  );
};
