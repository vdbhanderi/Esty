import axios from 'axios';
import backendUrl from "../../components/config";
import {  GET_PROFILE } from '../Actions/constants';

export const profileDetails = (details) => (dispatch) => {
    console.log("profile dispatch")
    axios.defaults.withCredentials = true;
    axios.post(`${backendUrl}/api/getProfile`, details)
      .then((response) => {dispatch({
        type:  GET_PROFILE,
        payload: response.data,
      })
      console.log("response of reducer",response.status)
      if(response.status === 204) { alert("username or password is not correct")};
    }
      )
  };