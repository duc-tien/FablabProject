import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStyle>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
