import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import classNames from 'classnames';
import { Product } from '../../types/product';
import { AddToCart } from '../AddToCart';
import { CartItemType } from '../../types/cart';

type Props = {
  product: Product;
  isNew?: boolean;
};

const HEADER_HEIGHT = 70;

export const ProductCard: React.FC<Props> = ({ product, isNew = false }) => {
  const {
    id,
    itemId,
    images,
    name,
    priceDiscount,
    priceRegular,
    screen,
    capacity,
    ram,
    category,
  } = product;

  const cartItem: CartItemType = {
    id,
    name,
    images,
    priceDiscount,
    priceRegular,
    quantity: 1,
    capacity,
    ram,
    category,
  };

  const preparedCapacity = useMemo(() => {
    return `${capacity.slice(0, -2)} ${capacity.slice(-2)}`;
  }, [capacity]);

  const preparedRam = useMemo(() => {
    return `${ram.slice(0, -2)} ${ram.slice(-2)}`;
  }, [ram]);

  return (
    <article
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={`/${category}/${itemId || id}`}
        state={{ product }}
        className="product-card__link"
        onClick={() => window.scrollTo(0, HEADER_HEIGHT)}
      >
        <div className="product-card__imgbox">
          <img
            loading='lazy'
            src={`${images[0]}`}
            alt={name}
            className="product-card__img"
            height={207}
            width={159}
          />
        </div>

        <p className="product-card__title">{name}</p>

        <div className="product-card__pricebox">
          {!isNew && <h2>{`$${priceDiscount}`}</h2>}

          <h2
            className={classNames({
              'product-card__price': !isNew,
            })}
          >
            {`$${priceRegular}`}
          </h2>
        </div>

        <ul className="product-card__options">
          <li className="product-card__option-item">
            <p className="product-card__option-name product-card__option-name--screen">Screen</p>
            <p className="product-card__option-value">{screen}</p>
          </li>
          <li className="product-card__option-item">
            <p className="product-card__option-name">Capacity</p>
            <p className="product-card__option-value">{preparedCapacity}</p>
          </li>
          <li className="product-card__option-item">
            <p className="product-card__option-name">RAM</p>
            <p className="product-card__option-value">{preparedRam}</p>
          </li>
        </ul>
      </Link>

      <AddToCart product={cartItem} />
    </article>
  );
};
