import axios from "axios";
import backendUrl from "../../components/config";
import * as actionTypes from "./constants"

export const GetItems = () => async (dispatch) => {

    try {
        var data=[]
        console.log('Inside action')
        axios.post(`${backendUrl}/api/getItemListForDashboard`, data)
            .then((response) => {
                dispatch({ type: actionTypes.GET_ITEMS, payload: response.data });
            });
    } catch (error) {
        dispatch({ type: actionTypes.GET_ITEMS, payload: error.response });
    }
};
export const AddFavouriteIds = (details) => async (dispatch) => {

    try {
        console.log('Inside action')
        await axios.post(`${backendUrl}/api/addFavourite`, details)
            .then((response) => {
                dispatch({ type: actionTypes.GET_FAVOURITE, payload: response.data });
            });
    } catch (error) {
        dispatch({ type: actionTypes.GET_FAVOURITE_ERROR, payload: error.response });
    }
};
export const RemoveFavouriteIds = (details) => async (dispatch) => {

    try {
        console.log('Inside action')
        await axios.post(`${backendUrl}/api/removeFavourite`, details)
            .then((response) => {
                dispatch({ type: actionTypes.GET_FAVOURITE, payload: response.data });
            });
    } catch (error) {
        dispatch({ type: actionTypes.GET_FAVOURITE_ERROR, payload: error.response });
    }
};