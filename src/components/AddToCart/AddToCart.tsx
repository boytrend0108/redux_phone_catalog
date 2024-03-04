import { useEffect, useState } from 'react';

import './AddToCart.scss';
import { MyButton } from '../UI/MyButton';
import { CartItemType } from '../../types/cart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartSlice from '../../features/cart/cartSlice';

type Props = {
  product: CartItemType;
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const {
    itemId,
  } = product;

  const [favorite, setFavorite] = useState(false);
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();

  const isSelected = cart.some(el => el.itemId === itemId);

  function handleSetFavorite() {
    if (!favorite) {
      dispatch({ type: 'addFavorite', payload: itemId });
    } else {
      dispatch({ type: 'removeFavorite', payload: itemId });
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
    setFavorite(favorites.includes(itemId));
  }, [favorites, itemId]);

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
};
