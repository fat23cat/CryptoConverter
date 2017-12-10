import React from 'react';
import Header from '../header/header.js';
import Currencies from '../currencies/currencies.js';
import Converter from '../converter/converter.js';
import CurrenciesInfo from '../currenciesinfo/currenciesinfo.js';
import NotFound from '../notfound/notfound.js';
import { Switch, Route } from 'react-router-dom';
import './crypto-widget.css';


class CryptoWidget extends React.Component {
  render() {
    return (
      <div className='crypto-widget'>
        <Header />
        <Switch>
          <Route exact path='/' component={Currencies}/>
          <Route path='/converter' component={Converter}/>
          <Route path='/currenciesinfo' component={CurrenciesInfo}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default CryptoWidget;
