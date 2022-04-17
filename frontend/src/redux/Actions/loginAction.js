import axios from 'axios';
import backendUrl from "../../components/config";
import { USER_LOGIN_ERROR, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../Actions/constants';


export const userLogin = (loginInfo) => (dispatch) => {
  console.log("login dispatch")
  axios.defaults.withCredentials = true;
  axios.post(`${backendUrl}/api/login`, loginInfo)
    .then((response) => {dispatch({
      type: response.status === 200 ? USER_LOGIN_SUCCESS : USER_LOGIN_ERROR,
      payload: response.data,
    })
    console.log("response of reducer",response.status)
    if(response.status === 204) { alert("username or password is not correct")};
  }
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: USER_LOGIN_ERROR,
          payload: error.response.data,
        });
      }
    });
};

export const userLogout = () => (dispatch) => dispatch({ type: USER_LOGOUT });