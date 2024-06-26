import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';
import { Navbar } from '../Navbar';
import { MyLogo } from '../UI/MyLogo';
import { MySearch } from '../UI/MySearch';
import { CategoryName } from '../../types/product';
import { useAppSelector } from '../../app/hooks';
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header = () => {
  const { favorites } = useAppSelector(state => state.favorites)
  const { cart } = useAppSelector(state => state.cart)
  const numberOfFavorite = favorites.length;
  const productsInCart = cart.length;
  const { pathname } = useLocation();

  return (
    <header className="header" id="top">
      <div className="header__left">
        <MyLogo />
        <Navbar />
      </div>

      <div className="header__right">
        {false && (
          <div className="header__theme">
            <ThemeSwitcher />
          </div>
        )}

        {pathname === '/phones' && (
          <MySearch
            placeholder={CategoryName.phone}
          />
        )}

        <NavLink
          to="/favorite"
          className={({ isActive }) => {
            return classNames(
              'header__link header__link--favorite', {
              'header__link--active': isActive,
            },
            );
          }}
        >
          <img src="img/icons/heart.svg" alt="favorite" />

          {!!numberOfFavorite && (
            <div className="header__counter">{numberOfFavorite}</div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          state={{ previousPath: pathname }}
          className={({ isActive }) => {
            return classNames(
              'header__link header__link--cart', {
              'header__link--active': isActive,
            },
            );
          }}
        >
          <img src="img/icons/cart.svg" alt="cart" />
          {!!productsInCart && (
            <div className="header__counter">{productsInCart}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
