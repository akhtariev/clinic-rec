import { INVALIDATE_USERS, REQUEST_USERS, RECEIVE_USERS } from '../actions/userActions';

const initialState = {
  isFetchingUsers: false,
  didInvalidateUsers: false,
  responseData: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVALIDATE_USERS:
      return { ...state, didInvalidateUsers: true };
    case REQUEST_USERS:
      return { ...state, isFetchingUsers: true, didInvalidateUsers: false };
    case RECEIVE_USERS:
      return {
        ...state,
        isFetchingUsers: false,
        didInvalidateUsers: false,
        responseData: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
