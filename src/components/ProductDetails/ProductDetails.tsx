import { memo, useEffect, useMemo, useRef, useState } from 'react';

import './ProductDetails.scss';
import { AddToCart } from '../AddToCart';
import { Product, ProductDescription } from '../../types/product';
import { CartItemType } from '../../types/cart';
import { AvailableColors } from '../AvailableColors';
import { AvailableCapacity } from '../AvailableCapacity';

type Props = {
  product: Product;
};

const PARAMS: (keyof ProductDescription)[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

export const ProductDetails: React.FC<Props> = memo(({ product }) => {
  const {
    images = [],
    name,
    priceDiscount = 0,
    priceRegular = 0,
    description = [],
    colorsAvailable = [],
    capacityAvailable = [],
    category,
    ram,
    capacity,
  } = product;

  const cartItemData: CartItemType = useMemo(() => {
    return {
      id: product.id,
      name,
      images,
      priceDiscount,
      quantity: 1,
      priceRegular: 0,
      capacity,
      ram,
      category,
    }

  }, []);

  const [mainImage, setMainImage] = useState('');
  const imageIndex = useRef(0);

  function changeMainImage(preview: string, i: number) {
    setMainImage(preview);
    imageIndex.current = i;
  }


  useEffect(() => {
    setMainImage(images[imageIndex.current]);
  }, [images]);

  return (
    <section className="details">
      <div className="details__images">
        <div className="details__previews">
          {images.map((preview, i) => (
            <button
              key={preview}
              className="details__preview-box"
              type="button"
              onClick={() => changeMainImage(preview, i)}
            >
              <img
                src={`${preview}`}
                alt="preview"
                className="details__preview-item"
              />
            </button>
          ))}
        </div>

        <div className="details__img-box">
          <img
            src={`${mainImage}`}
            alt={name}
            className="details__img"
          />
        </div>
      </div>

      <div className="details__options">
        <div className="details__available">
          <AvailableColors colorsAvailable={colorsAvailable} />
          <AvailableCapacity availableCapacity={capacityAvailable} />
        </div>

        <div className="details__available">
          <div className="details__price-box">
            <p className="details__discount">{`$${priceDiscount}`}</p>
            <p className="details__price">{`$${priceRegular}`}</p>
          </div>

          <div className="details__buttons">
            <AddToCart product={cartItemData} />
          </div>

          <div className="details__params">
            {PARAMS.map((param, i) => {
              if (i > 4) {
                return false;
              }

              const value = product[param] as string;

              return (
                <div className="details__param" key={param}>
                  <p className="details__param-name">{param}</p>
                  <p className="details__param-value">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <article className="details__about" data-cy="productDescription">
        <h2 className="details__subtitle">About</h2>

        {description.map(el => (
          <div className="details__description" key={el.title}>
            <h3>{el.title}</h3>
            <p className="details__text">{el.text}</p>
          </div>
        ))}
      </article>

      <article className="details__about">
        <h2 className="details__subtitle">Tech specs</h2>

        <div className="details__params">
          {PARAMS.map(param => {
            const value = product[param] as string;

            return (
              <div className="details__param" key={param}>
                <p className="details__param-name">{param}</p>
                <p className="details__param-value">{value}</p>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
});
