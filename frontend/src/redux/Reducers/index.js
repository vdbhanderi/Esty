import { combineReducers } from 'redux';
import {loginUserReducer,loginUserDetails} from './loginUserReducer';
import getItemsReducer from './dashboardReducer';
import {favouriteIdsReducer} from './dashboardReducer';
import addToCart, { checkOut, getCart } from './cartReducer';
import { getOrderedItems } from './itemsReducers';
import { profileDetails } from './profile';


export default combineReducers({
  isLoggedIn: loginUserReducer,
  items:getItemsReducer,
  userInfo: loginUserDetails,
 // userInfo: profileDetails,
  isCartAdded:addToCart,
  cart:getCart,
  isOrdered:checkOut,
  orderedItems:getOrderedItems,
  favIds:favouriteIdsReducer
});