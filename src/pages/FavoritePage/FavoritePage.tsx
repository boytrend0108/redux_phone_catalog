import { useEffect, useState } from 'react';

import './FavoritePage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { MyLoader } from '../../components/UI/MyLoader';

import { Product } from '../../types/product';

import { useAppSelector } from '../../app/hooks';

export const FavoritePage = () => {
  const { favorites } = useAppSelector(state => state.favorites);
  const { phones } = useAppSelector(state => state.phones);
  const [loading, setLoading] = useState(true);
  const [favoritesList, setFavoritesList] = useState<Product[]>([]);

  useEffect(() => {
    setFavoritesList(favorites);
    setLoading(false);
  }, [favorites, phones]);

  return (
    <section className="favorite">
      <BreadCrumbs />

      <h1 className="favorite__title">Favourites</h1>
      <p className="favorite__counter">{`${favorites.length} models`}</p>

      {loading
        ? <MyLoader />
        : <ProductList products={favoritesList} />}

    </section>
  );
};
