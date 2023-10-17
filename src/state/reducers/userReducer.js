import { SET_USER } from "../actions/actionTypes";

export const initialState = {
  userID: "",
  token: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        userID: action.payload.userID,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default userReducer;
