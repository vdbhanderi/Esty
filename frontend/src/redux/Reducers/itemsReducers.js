import * as actionTypes from "../Actions/constants"

export const getOrderedItems = (state = {}, action) => {
   //console.log(action.payload)
   switch(action.type) {
       case actionTypes.ORDERED_ITEMS:
           return action.payload 
       case actionTypes.GET_CART_ERROR:
            return action.payload
       default:
           return state
   }
};

