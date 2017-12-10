import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';


describe('components', () => {
  it('should render a Header', () => {
   const wrapper = (<Header />);
   expect(wrapper).toMatchSnapshot();
  })
})
