import { combineReducers } from 'redux';
import {loginUserReducer,loginUserDetails} from './loginUserReducer';
import getItemsReducer from './dashboardReducer';
import addToCart from './cartReducer';


export default combineReducers({
  isLoggedIn: loginUserReducer,
  items:getItemsReducer,
  userInfo: loginUserDetails,
  cartId:addToCart
});