import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';


class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <ul className='header-list'>
          <li><Link className='header-list__item' to='/'>Currencies</Link></li>
          <li><Link className='header-list__item' to='/converter'>Converter</Link></li>
          <li><Link className='header-list__item' to='/currenciesinfo'>Curriecnies info</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
