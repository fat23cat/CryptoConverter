import {
  GET_DATA_SUCCESS,
  DATA_ERROR,
  DATA_PROCESS,
  ADD_COIN } from '../constants/actionConsts.js';

import {currencies} from '../constants/initialConsts.js';

export function currenciesReducer(state = [], action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return action.currencies;

    default:
      return state;
  }
}

export function dataErrorReducer(state = false, action) {
  switch (action.type) {
    case DATA_ERROR:
      return action.status;

    default:
      return state;
  }
}

export function dataProcessReducer(state = false, action) {
  switch (action.type) {
    case DATA_PROCESS:
      return action.status;

    default:
      return state;
  }
}

export function selectedCurrenciesReducer(state = currencies, action) {
  //console.log('type', action.type, 'state', state, 'action', action);
  switch (action.type) {
    case ADD_COIN:
      if (state.indexOf(action.coin) >= 0) {
        //console.log('state', state);
        return state.filter((item) => item !== action.coin);
      } else {
        return [...state, action.coin];
      }

    default:
      return state;
  }
}
