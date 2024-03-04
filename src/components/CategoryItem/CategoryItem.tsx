
import { Link } from 'react-router-dom';

import './CategoryItem.scss';
import { Category } from '../../types/product';
import { useAppSelector } from '../../app/hooks';

type Props = {
  category: Category;
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const { phones } = useAppSelector(state => state.phones);
  const quantity = phones.filter(product => {
    return product.category === category.category;
  }).length;

  return (
    <article className="category-item">
      <Link to={category.category} className="category-item__wrapper">
        <img
          src={category.img}
          alt={category.title}
          className="category-item__img"
        />
      </Link>

      <h3>{category.title}</h3>
      <p className="category-item__quantity">{`${quantity} models`}</p>
    </article>
  );
};
