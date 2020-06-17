import { INVALIDATE_CLINICS, REQUEST_CLINICS, RECEIVE_CLINICS, INVALIDATE_ALLSTARS, REQUEST_ALLSTARS, RECEIVE_ALLSTARS } from '../actions/clinicActions';

const initialState = {
  isFetchingClinics: false,
  didInvalidateClinics: false,
  responseData: null,
  allStarResponseData: null,
  isFetchingAllStars: false,
  didInvalidateAllStars: false,
};

const clinicReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVALIDATE_CLINICS:
      return { ...state, didInvalidateClinics: true };
    case REQUEST_CLINICS:
      return { ...state, isFetchingClinics: true, didInvalidateClinics: false };
    case RECEIVE_CLINICS:
      return {
        ...state,
        isFetchingClinics: false,
        didInvalidateClinics: false,
        responseData: payload,
      };
    case INVALIDATE_ALLSTARS:
      return { ...state, didInvalidateAllStars: true };
    case REQUEST_ALLSTARS:
      return { ...state, isFetchingAllStars: true, didInvalidateAllStars: false };
    case RECEIVE_ALLSTARS:
      return {
        ...state,
        isFetchingAllStars: false,
        didInvalidateAllstars: false,
        allStarResponseData: payload,
      };
    default:
      return state;
  }
};

export default clinicReducer;
