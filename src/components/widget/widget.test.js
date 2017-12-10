import React from 'react';
import ReactDOM from 'react-dom';
import CryptoWidget from './crypto-widget.js';

describe('components', () => {
  it('should render a CryptoWidget', () => {
   const wrapper = (<CryptoWidget />);
   expect(wrapper).toMatchSnapshot();
  })
})
