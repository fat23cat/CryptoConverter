import {
  GET_DATA_SUCCESS,
  DATA_ERROR,
  DATA_PROCESS,
  ADD_COIN } from '../constants/actionConsts.js';

export function getDataSuccess(currencies) {
  return {
    type: GET_DATA_SUCCESS,
    currencies
  };
}

export function dataError(bool) {
  return {
    type: DATA_ERROR,
    status: bool
  }
}

export function dataProcess(bool) {
  return {
    type: DATA_PROCESS,
    status: bool
  }
}

export function addCoin(coin) {
  return {
    type: ADD_COIN,
    coin
  }
}

export function getCurrencies(url) {
  return (dispatch) => {
    dispatch(dataProcess(true));
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
        dispatch(dataProcess(false));
        dispatch(getDataSuccess(text))
      })
      .catch((error) => {
        dispatch(dataError(true));
      });
  }
}
