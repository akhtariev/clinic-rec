import { INVALIDATE_DOCTORS, REQUEST_DOCTORS, RECEIVE_DOCTORS } from '../actions/doctorActions';

const initialState = {
  isFetchingDoctors: false,
  didInvalidateDoctors: false,
  responseData: null 
};

const doctorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVALIDATE_DOCTORS:
      return { ...state, didInvalidateDoctors: true };
    case REQUEST_DOCTORS:
      return { ...state, isFetchingDoctors: true, didInvalidateDoctors: false };
    case RECEIVE_DOCTORS:
      return {
        ...state,
        isFetchingDoctors: false,
        didInvalidateDoctors: false,
        responseData: payload
      };
    default:
      return state;
  }
};

export default doctorReducer;