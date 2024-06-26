import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import './CartPage.scss';
import { MyBackLink } from '../../components/UI/MyBackLink';
import { MyLoader } from '../../components/UI/MyLoader';
import { MyButton } from '../../components/UI/MyButton';
import { MyModal } from '../../components/UI/MyModal';
import { CartItem } from '../../components/CartItem';

import { setScrollState } from '../../helpers/pageHelper';

import { useAppSelector } from '../../app/hooks';

export const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const { cart } = useAppSelector(state => state.cart)
  const [showModal, setShowModal] = useState(false);

  const cartData = cart.reduce((acc, item) => {
    return {
      totalPrice: acc.totalPrice + item.priceDiscount * item.quantity,
      quantity: acc.quantity + item.quantity,
    };
  }, { totalPrice: 0, quantity: 0 });

  const { totalPrice, quantity } = cartData;

  useEffect(() => {
    setLoading(false);
  }, [cart]);

  return (
    <section className="cart-page">
      {showModal && (
        <>
          {createPortal(
            <MyModal
              closeModal={() => setShowModal(false)}
            >
              <h3>We are sorry, but this feature is not implemented yet</h3>
            </MyModal>,
            document.body,
          )}
        </>
      )}

      <MyBackLink />
      <h1 className="cart-page__title">Cart</h1>

      {loading
        ? <MyLoader />
        : (
          <>
            {!cart.length
              ? <h2>Your cart is empty</h2>
              : (
                <div className="cart-page__products">
                  <div className="cart-page__list">
                    {cart.map(item => (
                      <CartItem
                        key={item.images[0]}
                        product={item}
                      />
                    ))}
                  </div>

                  <div className="cart-page__total">
                    <p className="cart-page__total-price">
                      {`$${totalPrice}`}
                    </p>

                    <p className="cart-page__total-quantity">
                      {`Total for ${quantity} items`}
                    </p>

                    <MyButton
                      handleClick={() => {
                        setShowModal(true);
                        setScrollState('hidden');
                      }}
                    >
                      Checkout
                    </MyButton>
                  </div>
                </div>
              )}
          </>
        )}
    </section>
  );
};
