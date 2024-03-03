import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { getLocalStorigeData } from './helpers/localStorageHelper';
import { useAppDispatch } from './app/hooks';
import * as phonesSlice from './features/phones/phonesSlice';

export const App = () => {
  const dispatch = useAppDispatch();

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
    <div className="App">
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
