import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import CryptoWidget from './components/widget/crypto-widget.js';
import './index.css';
import './components/adaptive/media.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <CryptoWidget />
    </HashRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
