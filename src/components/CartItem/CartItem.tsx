import { Link } from 'react-router-dom';

import './CartItem.scss';
import { CartItemType } from '../../types/cart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartSlice from '../../features/cart/cartSlice';

type Props = {
  product: CartItemType;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    itemId,
  } = product;

  const { cart } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const quantity = cart.find(el => {
    return el.itemId === itemId
  })?.quantity || 1;

  return (
    <div className="cart-item">
      <button
        type="button"
        className="cart-item__delete"
        aria-label="delete item"
        onClick={() => dispatch(cartSlice.removeItem(product))
      }
    />

      <Link
        to={`../phones/${itemId}`}
        className="cart-item__image-link"
      >
        <img
          className="cart-item__image"
          src={`${image}`}
          alt={name}
        />
      </Link>

      <div className="cart-item__middle">
        <p className="cart-item__name">{name}</p>

        <div className="cart-item__counter">
          <button
            type="button"
            className="cart-item__control cart-item__control--minus"
            aria-label="minus one"
            disabled={quantity === 1}
            onClick={() => dispatch(cartSlice.decrease(itemId))}
          />

          <p className="cart-item__quantity">{quantity}</p>

          <button
            type="button"
            className="cart-item__control cart-item__control--plus"
            aria-label="plus one"
            onClick={() => dispatch(cartSlice.increase(itemId))}
          />
        </div>
      </div>

      <h2 className="cart-item__price">{`$${price * quantity}`}</h2>
    </div>
  );
};
