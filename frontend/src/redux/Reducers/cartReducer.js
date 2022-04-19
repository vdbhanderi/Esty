import * as actionTypes from "../Actions/constants"

 const addToCart = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            return true 
        case actionTypes.ADD_TO_CART_ERROR:
            return false 
        default:
            return state
    }
};
export const getCart = (state = {}, action) => {
   //console.log(action.payload)
   switch(action.type) {
       case actionTypes.GET_CART:
           return action.payload 
       case actionTypes.GET_CART_ERROR:
            return action.payload
       default:
           return state
   }
};
export const checkOut = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.CHECKOUT_SUCCESS:
            return true 
        case actionTypes.CHECKOUT_ERROR:
            return false 
        default:
            return state
    }
 };
export default addToCart;