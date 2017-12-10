import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './converter.js';

describe('components', () => {
  it('should render a Converter', () => {
   const wrapper = (<Converter />);
   expect(wrapper).toMatchSnapshot();
  })
})
