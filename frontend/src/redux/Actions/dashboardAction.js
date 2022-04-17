import axios from "axios";
import backendUrl from "../../components/config";
import * as actionTypes from "./constants"

export const GetItems = () => async (dispatch) => {

    try {
        var data=[]
        console.log('Inside action')
        axios.post(`${backendUrl}/api/getItemListForDashboard1`, data)
            .then((response) => {
                dispatch({ type: actionTypes.GET_ITEMS, payload: response.data });
            });
    } catch (error) {
        dispatch({ type: actionTypes.GET_ITEMS, payload: error.response });
    }
};