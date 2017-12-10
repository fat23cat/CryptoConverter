import React from 'react';
import ReactDOM from 'react-dom';
import CurrenciesInfo from './currenciesinfo.js';

describe('components', () => {
  it('should render a CurrenciesInfo', () => {
   const wrapper = (<CurrenciesInfo />);
   expect(wrapper).toMatchSnapshot();
  })
})
