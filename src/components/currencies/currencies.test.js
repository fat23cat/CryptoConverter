import React from 'react';
import ReactDOM from 'react-dom';
import Currencies from './currencies.js';

describe('components', () => {
  it('should render a Currencies', () => {
   const wrapper = (<Currencies />);
   expect(wrapper).toMatchSnapshot();
  })
})
