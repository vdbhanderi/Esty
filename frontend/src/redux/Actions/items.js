import axios from 'axios';
import backendUrl from "../../components/config";
import {  GET_CART_ERROR, ORDERED_ITEMS } from '../Actions/constants';


export const getOrderedItems = (details) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${backendUrl}/api/getOrderedItems`, details)
    .then((response) => {dispatch({
      type: ORDERED_ITEMS,
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

