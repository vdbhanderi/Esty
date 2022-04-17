import * as actionTypes from "../Actions/constants"

 const getItemsReducer = (state = {}, action) => {
     console.log(action.payload)
    switch(action.type) {
        case actionTypes.GET_ITEMS:
            return  action.payload 
        
        default:
            return state
    }
};
export default getItemsReducer;