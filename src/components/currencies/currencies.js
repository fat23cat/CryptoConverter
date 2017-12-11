import React from 'react';
import './currencies.css';
import Message from '../message/message.js';
import { connect } from 'react-redux';
import { getCurrencies, addCoin } from '../../actions/actions.js';

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterString: ''
    };
  }
  componentDidMount() {
    const currenciesCount = 30;
    this.props.fetchData('https://api.coinmarketcap.com/v1/ticker/?limit=' + currenciesCount);
  }

  setFilterString = (event) => {
    this.setState({
      filterString: event.target.value
    });
  }

  render() {
    //console.log(this.props.selectedCurrencies);
    if(this.props.statusError) {
      return (
        <Message text='Error API request'/>
      );
    }

    if(this.props.statusLoading) {
      //console.log('Loading',this.props.statusLoading);
      return (
        <Message text='Loading...'/>
      );
    }

    const filteredCurrencies = this.props.currencies.filter((item) => (item.name.toLowerCase().indexOf(this.state.filterString.toLowerCase()) >= 0));

    return (
      <div className='currencies'>
        <input className='currencies__search' type='text' placeholder='Search currency...' value={this.state.filterString} onChange={this.setFilterString}/>
        <ul className='currencies-list'>
          {filteredCurrencies.map((item) => (
            <li key={item.symbol} className='currencies-list__item'>
              <div>
                <label>
                  <input type='checkbox' checked={this.props.selectedCurrencies.indexOf(item.symbol) >= 0} onChange={() => this.props.addCoin(item.symbol)}/>
                  {item.name} / {item.symbol}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        selectedCurrencies: state.selectedCurrencies,
        currencies: state.currencies,
        statusError: state.dataError,
        statusLoading: state.dataLoading,
        addCurrency: state.addCurrency
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(getCurrencies(url)),
        addCoin: (coin) => dispatch(addCoin(coin))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
