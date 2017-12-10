import React from 'react';
import './converter.css';
import Message from '../message/message.js';
import { connect } from 'react-redux';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      isOpenAPIError: false,
      isOpenResult: false,
      isOpenInputError: false,
      inputValue: '',
      fromCurrency: this.props.selectedCurrencies[0],
      toCurrency: this.props.selectedCurrencies[0],
      apiAnswer: null,
      rezult: null
    }
  }

  setFromCurrency = (event) => {
    this.setState({
      ...this.state,
      isOpenAPIError: false,
      isOpenResult: false,
      isOpenInputError: false,
      fromCurrency: event.target.value
    });
  }

  setToCurrency = (event) => {
    this.setState({
      ...this.state,
      isOpenAPIError: false,
      isOpenResult: false,
      isOpenInputError: false,
      toCurrency: event.target.value
    });
  }

  setValue = (event) => {
    this.setState({
      ...this.state,
      isOpenAPIError: false,
      isOpenResult: false,
      isOpenInputError: false,
      inputValue: event.target.value
    });
  }

  createRezult = () => {
    if (this.state.apiAnswer.Response === 'Error') {
      this.setState({
        ...this.state,
        isOpenAPIError: true
      });
    } else {
      const multi = this.state.inputValue * this.state.apiAnswer[this.state.toCurrency];
      this.setState({
        ...this.state,
        isOpenResult: true,
        rezult: multi
      });
    }
  }

  isFinite = () => {
    let n = this.state.inputValue;
    if(!isNaN(parseFloat(n)) && isFinite(n)) {
      this.sendRequest();
    } else {
      this.setState({
        ...this.state,
        inputValue: '',
        isOpenInputError: true
      })
    }

  }

  sendRequest = () => {
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=' + this.state.fromCurrency + '&tsyms=' + this.state.toCurrency;
    //console.log(url);
    this.setState({
      ...this.state,
      loadingStatus: true
    });
    fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((text) => {
        this.setState({
          ...this.state,
          loadingStatus: false,
          apiAnswer: text
        })
        //console.log(text[this.state.toCurrency]);
        this.createRezult();
        return text;
      })
      .catch((error) => {
        //console.log(error);
        this.setState({
          ...this.state,
          isOpenAPIError: true,
        })
      });
  }

  render() {
    if(this.props.statusError) {
      return (
        <Message text='Error API request'/>
      );
    }

    return (
      <div className='converter'>
        <div className='options-fields'>
          <input className='options-fields__input' type='text' placeholder='Input value...' value={this.state.inputValue} onChange={this.setValue}/>
          <select className='options-fields__select' value={this.state.fromCurrency} onChange={this.setFromCurrency}>
            {this.props.selectedCurrencies.map((item, index) => (
              <option key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='options-fields'>
          <span className='options-fields__text'>
            Into
          </span>
          <select className='options-fields__select' value={this.state.toCurrency} onChange={this.setToCurrency}>
            {this.props.selectedCurrencies.map((item, index) => (
              <option key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <span className='button-render' onClick={this.isFinite}>Convert it!</span>
        {this.state.isOpenResult && (<span className='converter__result'>
          {this.state.rezult} {this.state.toCurrency}
        </span>)}
        {this.state.isOpenAPIError && (<Message text='API error' />)}
        {this.state.isOpenInputError && (<Message text='You should input only digits, use " . " instead of " , "' />)}
        {this.state.loadingStatus && (<Message text='Loading...' />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        selectedCurrencies: state.selectedCurrencies,
        statusError: state.dataError
    };
};


export default connect(mapStateToProps)(Converter);
