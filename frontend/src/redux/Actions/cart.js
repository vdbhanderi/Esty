import axios from 'axios';
import backendUrl from "../../components/config";
import {  REMOVE_FROM_CART, ADD_TO_CART,ADD_TO_CART_ERROR, GET_CART,GET_CART_ERROR,CHECKOUT_ERROR, CHECKOUT_SUCCESS } from '../Actions/constants';


export const addToCart = (details) => (dispatch) => {
  console.log("addtocart dispatch")
  axios.defaults.withCredentials = true;
  axios.post(`${backendUrl}/api/addToCart`, details)
    .then((response) => {dispatch({
      type: ADD_TO_CART,
      payload: response.data,
    })
    console.log("response of reducer",response.status)
    if(response.status === 204) { alert("username or password is not correct")};
  }
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ADD_TO_CART_ERROR,
          payload: error.response.data,
        });
      }
    });
};
export const removeFromCart = (details) => (dispatch) => {
  console.log("removeFromCart dispatch")
  axios.defaults.withCredentials = true;
  axios.post(`${backendUrl}/api/addToCart`, details)
    .then((response) => {dispatch({
      type: REMOVE_FROM_CART,
      payload: response.data,
    })
    console.log("response of reducer",response.status)
    if(response.status === 204) { alert("username or password is not correct")};
  }
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: ADD_TO_CART_ERROR,
          payload: error.response.data,
        });
      }
    });
};

export const getCart = (details) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendUrl}/api/getCart`, details)
    .then((response) => {dispatch({
      type: GET_CART,
      payload: response.data,
    })
    console.log("response of reducer",response.status)
  }
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: GET_CART_ERROR,
          payload: error.response.data,
        });
      }
    });
};
export const checkOut = (details) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendUrl}/api/checkOut`, details)
    .then((response) => {dispatch({
      type: CHECKOUT_SUCCESS,
      payload: response.data,
    })
    console.log("response of checkOut",response.status)
  }
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CHECKOUT_ERROR,
          payload: error.response.data,
        });
      }
    });
};
