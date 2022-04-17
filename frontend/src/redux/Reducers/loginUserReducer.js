import { USER_LOGIN_ERROR, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../Actions/constants';

export const loginUserDetails = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return true
    case USER_LOGOUT:
      return {};
    case USER_LOGIN_ERROR:
      return false
    default:
      return state;
  }
};