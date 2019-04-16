import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cryptoReducer from '../reducers/cryptoReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creating the redux store: 
export default () => {
    const store = createStore (combineReducers({
        crypto: cryptoReducer,
      }),
      
      composeEnhancers(applyMiddleware(thunk))
    );

    return store;
  };