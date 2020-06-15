import axios from '../axiosInstance';

export const GET_PATIENT = 'GET_PATIENT';
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const REQUEST_PATIENT = 'REQUEST_PATIENT';
export const RECEIVE_PATIENT = 'RECEIVE_PATIENT';
export const RECEIVE_PATIENT_AFTER_PAYMENT = 'RECEIVE_PATIENT_AFTER_PAYMENT';
export const INVALIDATE_PATIENT = 'INVALIDATE_PATIENT';

export const requestPatient = () => ({
  type: REQUEST_PATIENT,
});

export const receivePatient = response => ({
  type: RECEIVE_PATIENT,
  payload: response.data.data,
});

export const invalidatePatient = () => ({
  type: INVALIDATE_PATIENT,
});

export const createPatient = async (dispatch, patientId, username, getTokenCb) => {
  const token = await getTokenCb();
  dispatch(requestPatient(dispatch));

  axios.post(`/api/users/patient/${patientId}`, { username }, { headers: { Authorization: `Bearer ${token}` } })
    .then(
      response => {
        dispatch(receivePatient(response));
      },
      error => {
        console.log('Error fetching user: ', error);
        dispatch(invalidatePatient());
      },
    );
};

export const getPatient = async (dispatch, patientId, getTokenCb) => {
  const token = await getTokenCb();

  dispatch(requestPatient(dispatch));

  axios.get(`/api/users/patient/${patientId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(
      response => {
        dispatch(receivePatient(response));
      },
      error => {
        console.log('Error fetching user: ', error);
        dispatch(invalidatePatient());
      },
    );
};
