import { combineReducers } from 'redux';
import {loginUserReducer,loginUserDetails} from './loginUserReducer';
import getItemsReducer from './dashboardReducer';
import addToCart, { checkOut, getCart } from './cartReducer';


export default combineReducers({
  isLoggedIn: loginUserReducer,
  items:getItemsReducer,
  userInfo: loginUserDetails,
  isCartAdded:addToCart,
  cart:getCart,
  isOrdered:checkOut
});