import React from 'react';
import  './currenciesinfo.css';
import Message from '../message/message.js';
import { connect } from 'react-redux';
import { getCurrencies } from '../../actions/actions.js';

class CurrenciesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: [],
      filterString: ''
    };
  }

  componentDidMount() {
    const msec = 30000;
    const currenciesCount = 30;
    this.props.fetchData('https://api.coinmarketcap.com/v1/ticker/?limit=' + currenciesCount);
    this.timerID = setInterval(() => this.props.fetchData('https://api.coinmarketcap.com/v1/ticker/?limit=' + currenciesCount), msec);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(nextProps) {
    const filteredCurrencies = this.props.currencies.filter((item) => item.name.toLowerCase().indexOf(this.state.filterString.toLowerCase()) >= 0);
    const currenciesID = filteredCurrencies.map((item) => item.id);
    const currentUSD = this.props.currencies.map((item) => item.price_usd);
    const nextUSD = nextProps.currencies.map((item) => item.price_usd);
    const nextCurrenciesID = nextProps.currencies.map((item) => item.id);
    const newID = [];
    currenciesID.forEach((item, i) => {
      nextCurrenciesID.forEach((item, j) => {
        if (currenciesID[i] === nextCurrenciesID[j]) {
          if (currentUSD[j] - nextUSD[j] > 0) {
            newID.push('info--decrement');
          } else if (currentUSD[j] - nextUSD[j] < 0) {
            newID.push('info--increment');
          } else {
            newID.push('');
          }
        }
      })
    })
    this.setState({
      ...this.state,
      id: newID
    });
  }

  setFilterString = (event) => {
    this.setState({
      ...this.state,
      filterString: event.target.value
    });
  }

  render() {
    if(this.props.statusError) {
      return (
        <Message text='Error API request'/>
      );
    }

    const filteredCurrencies = this.props.currencies.filter((item) => (item.name.toLowerCase().indexOf(this.state.filterString.toLowerCase()) >= 0));

    return (
      <div className='currenciesinfo'>
        <input className='currencies__search' type='text' placeholder='Search currency...' value={this.state.filterString} onChange={this.setFilterString}/>
        <ul className='info-list'>
          {filteredCurrencies.map((item, i) => (
            <li id={this.state.id[i]} className='info' key={item.symbol}>
              <div className='info__name'>
                <span>
                {item.name} / {item.symbol}
                </span>
              </div>
              <div className='info__stat'>
                <div className='currency-info currency-info--text'>
                  <span>
                  Price USD:
                  </span>
                  <span>
                  1 hour change:
                  </span>
                  <span>
                  24 hours change:
                  </span>
                  <span>
                  7 days change:
                  </span>
                </div>
                <div className='currency-info currency-info--data'>
                  <span>
                  {item.price_usd}$
                  </span>
                  <span>
                  {item.percent_change_1h}%
                  </span>
                  <span>
                  {item.percent_change_24h}%
                  </span>
                  <span>
                  {item.percent_change_7d}%
                  </span>
                </div>
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
        currencies: state.currencies,
        statusError: state.dataError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(getCurrencies(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesInfo);
