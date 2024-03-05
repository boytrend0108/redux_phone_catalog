import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { getLocalStorigeData } from './helpers/localStorageHelper';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as phonesSlice from './features/phones/phonesSlice';
import classNames from 'classnames';

export const App = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);

  useEffect(() => {
    dispatch(phonesSlice.phonesInit());

    const favoriteProducts = getLocalStorigeData('favoriteProducts');

    if (!favoriteProducts) {
      localStorage.setItem('favoriteProducts', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateFavorite',
        payload: favoriteProducts,
      });
    }

    const cart = getLocalStorigeData('cart');

    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateCart',
        payload: cart,
      });
    }
  }, [dispatch]);

  return (
    <div className={classNames("app", {
      'app--dark': theme === 'dark',
    }
    )}>
      <Header />
      <SideMenu />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
