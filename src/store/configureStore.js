import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(thunk),
          window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
