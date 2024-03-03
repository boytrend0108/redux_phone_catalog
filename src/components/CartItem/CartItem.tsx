import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import './CartItem.scss';
import { DispatchContext, StateContext } from '../../store/State';
import { CartItemType } from '../../types/cart';

type Props = {
  product: CartItemType;
};

enum Action {
  add = 'add',
  remove = 'remove',
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    itemId,
    quantity,
  } = product;

  const [counter, setCounter] = useState(quantity);
  const { cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  function handleDelete() {
    const updatedCart = cart.filter(item => item.itemId !== itemId);

    dispatch({ type: 'updateCart', payload: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  function handleChangeCounter(action: string) {
    let updatedCart: CartItemType[] = [];

    setCounter(prev => {
      return action === Action.remove
        ? prev - 1
        : prev + 1;
    });

    updatedCart = cart.map(el => {
      if (el.itemId === itemId) {
        return {
          ...el,
          quantity: action === Action.remove
            ? el.quantity - 1
            : el.quantity + 1,
        };
      }

      return el;
    });

    dispatch({ type: 'updateCart', payload: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  return (
    <div className="cart-item">
      <button
        type="button"
        className="cart-item__delete"
        aria-label="delete item"
        onClick={handleDelete}
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
            disabled={counter === 1}
            onClick={() => handleChangeCounter(Action.remove)}
          />

          <p className="cart-item__quantity">{counter}</p>

          <button
            type="button"
            className="cart-item__control cart-item__control--plus"
            aria-label="plus one"
            onClick={() => handleChangeCounter(Action.add)}
          />
        </div>
      </div>

      <h2 className="cart-item__price">{`$${price * counter}`}</h2>
    </div>
  );
};
