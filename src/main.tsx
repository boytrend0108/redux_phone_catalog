import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import { Root } from './Root';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>,
  );
