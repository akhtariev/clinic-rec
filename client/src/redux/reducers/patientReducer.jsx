import { UPDATE_PATIENT, INVALIDATE_PATIENT, REQUEST_PATIENT, RECEIVE_PATIENT, REQUEST_PATIENT_CREATE } from '../actions/patientActions';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  id: null,
  email: null,
  profile_picture_url: null,
  medHistory: null,
  triggerUpdate: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVALIDATE_PATIENT:
      return { ...state, didInvalidate: true };
    case REQUEST_PATIENT:
      return { ...state, isFetching: true, didInvalidate: false };
    case REQUEST_PATIENT_CREATE:
      return { ...state, isFetching: true, didInvalidate: false, triggerUpdate: true };
    case RECEIVE_PATIENT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        id: payload.patientData.id,
        email: payload.patientData.email,
        profile_picture_url: payload.patientData.profile_picture_url,
        medHistory: payload.medHistData,
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        triggerUpdate: false,
      };
    default:
      return state;
  }
};

export default userReducer;
