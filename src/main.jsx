import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import storeToolkit from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={storeToolkit}>
    <React.StrictMode>
      <GlobalStyle>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStyle>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
