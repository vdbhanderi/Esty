import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/Reducers';

const initialState = {items:null,isLoggedIn:false,userInfo:null,isCartAdded:false,cart:{},isOrdered:false,orderedItems:null};

const middleware = [thunk];

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(...middleware)),
);

export default store;