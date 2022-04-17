import * as actionTypes from "../Actions/constants"

 const addToCart = (state = {}, action) => {
     console.log(action.payload)
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            return  action.payload 
        default:
            return state
    }
};
export default addToCart;