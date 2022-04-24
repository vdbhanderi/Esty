import * as actionTypes from "../Actions/constants"

 const getItemsReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.GET_ITEMS:
            return  action.payload 
        
        default:
            return state
    }
};

export const favouriteIdsReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.GET_FAVOURITE:
            return  action.payload 
        
        default:
            return state
    }
};

export default getItemsReducer;