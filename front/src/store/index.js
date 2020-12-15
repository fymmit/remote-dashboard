import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { loadUser } from 'redux-oidc';
import { reducer as oidcReducer } from 'redux-oidc';
import { reducer as paskaReducer } from './paska';
import userManager from '../utils/userManager';

const configureStore = (history) => {
  
  const reducer = combineReducers(
    {
      router: connectRouter(history),
      oidc: oidcReducer,
      paska: paskaReducer,
    }
  );
  
  const loggerMiddleware = store => next => action => {
    console.log("Action type:", action.type);
    console.log("Action payload:", action.payload);
    console.log("State before:", store.getState());
    next(action);
    console.log("State after:", store.getState());
  };
  
  const initialState = {};
  
  const createStoreWithMiddleware = compose(
    applyMiddleware(loggerMiddleware, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore);
  
  const store = createStoreWithMiddleware(reducer, initialState);
  loadUser(store, userManager);
  
  return store;
};

export default configureStore;
