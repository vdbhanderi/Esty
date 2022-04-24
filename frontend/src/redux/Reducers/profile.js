import { GET_PROFILE } from '../Actions/constants';

export const profileDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload
    default:
      return state;
  }
};
