import { combineReducers } from 'redux';
import { currenciesReducer, dataErrorReducer, dataProcessReducer, selectedCurrenciesReducer } from './reducers.js';

export default combineReducers({
    currencies: currenciesReducer,
    dataError: dataErrorReducer,
    dataLoading: dataProcessReducer,
    selectedCurrencies: selectedCurrenciesReducer
});
