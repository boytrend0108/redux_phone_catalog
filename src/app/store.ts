import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

import phonesSlice, { PhonesState } from '../features/phones/phonesSlice';
import cartSlice, { CartState } from '../features/cart/cartSlice';
import favoritesSlice, { FavoritesState } from '../features/favorites/favoritesSlice';
import themeSlice, { ThemeState } from '../features/theme/themeSlice';

const persistConfig = {
  key: 'root',
  storage,
};

export type RootState = {
  phones: PhonesState;
  cart: CartState;
  favorites: FavoritesState;
  switchTheme: ThemeState;
};

const rootReducer: Reducer = combineReducers({
  phones: phonesSlice,
  cart: cartSlice,
  favorites: favoritesSlice,
  theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
});


export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
