import { currenciesReducer, dataErrorReducer, dataProcessReducer, selectedCurrenciesReducer } from '../reducers/reducers.js';
import {
  GET_DATA_SUCCESS,
  DATA_ERROR,
  DATA_PROCESS,
  ADD_COIN } from '../constants/actionConsts.js';

describe('currenciesReducer', () => {
  it('should return the initial state', () => {
    expect(currenciesReducer(undefined, {})).toEqual([])
  })
  it('should handle GET_DATA_SUCCESS', () => {
    const currencies = [{
      'currency_1': 'info'
    }, {
      'currency_2': 'info'
    }];
    expect(
      currenciesReducer([], {
        type: GET_DATA_SUCCESS,
        currencies
      })
    ).toEqual([{
      'currency_1': 'info'
    }, {
      'currency_2': 'info'
    }])
  })
})

describe('dataErrorReducer', () => {
  it('should return the initial state', () => {
    expect(dataErrorReducer(undefined, {})).toEqual(false)
  })
  it('should handle DATA_ERROR', () => {
    const status = true;
    expect(
      dataErrorReducer(status, {
        type: DATA_ERROR,
        status
      })
    ).toEqual(true)
  })
})

describe('dataProcessReducer', () => {
  it('should return the initial state', () => {
    const status = false;
    expect(dataProcessReducer(undefined, {})).toEqual(false)
  })
  it('should handle DATA_PROCESS', () => {
    const status = true;
    expect(
      currenciesReducer(status, {
        type: DATA_PROCESS,
        status
      })
    ).toEqual(true)
  })
})

describe('selectedCurrenciesReducer', () => {
  it('should return the initial state', () => {
    const currencies = ['USD', 'RUB', 'EUR'];
    expect(selectedCurrenciesReducer(currencies, {})).toEqual(['USD', 'RUB', 'EUR'])
  })
  it('should handle ADD_COIN', () => {
    const currencies = ['USD', 'RUB', 'EUR'];
    const coin = 'BTC';
    expect(
      selectedCurrenciesReducer(currencies, {
        type: ADD_COIN,
        coin
      })
    ).toEqual(['USD', 'RUB', 'EUR', 'BTC'])
  })
})
