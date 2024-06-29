import { memo, useEffect, useState } from 'react';

import './AddToCart.scss';
import { MyButton } from '../UI/MyButton';
import { CartItemType } from '../../types/cart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartSlice from '../../features/cart/cartSlice';
import * as favoritesSlice from '../../features/favorites/favoritesSlice';

type Props = {
  product: CartItemType;
};

export const AddToCart: React.FC<Props> = memo(({ product }) => {
  const {
    id,
  } = product;

  const [favorite, setFavorite] = useState(false);
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();

  const isSelected = cart.some(el => el.id === id);

  function handleSetFavorite() {
    if (!favorite) {
      dispatch(favoritesSlice.add(product));
    } else {
      dispatch(favoritesSlice.remove(product));
    }
  }

  function handleAddToCart() {
    if (!isSelected) {
      dispatch(cartSlice.addNew(product));

      return;
    }

    dispatch(cartSlice.removeItem(product));
  }

  useEffect(() => {
    const isFavorite = favorites.some(el => el.id === id);

    setFavorite(isFavorite);
  }, [favorites]);

  return (
    <div className="add-to-cart__btnbox">
      <MyButton
        handleClick={() => handleAddToCart()}
        isSelected={isSelected}
      >
        {isSelected ? 'Added to cart' : 'Add to cart'}
      </MyButton>

      <button
        type="button"
        data-cy="addToFavorite"
        className="add-to-cart__favorite"
        onClick={handleSetFavorite}
      >
        {favorite
          ? <img src="img/icons/heart-red.svg" alt="favorite product" />
          : <img src="img/icons/heart.svg" alt="favorite product" />}
      </button>
    </div>
  );
});
