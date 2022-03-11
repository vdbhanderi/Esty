import { combineReducers } from 'redux';
import loginUserReducer from './loginUserReducer';


export default combineReducers({
  login: loginUserReducer
  //signup: signUpUserReducer,
  
});