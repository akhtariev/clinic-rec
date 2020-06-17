import axios from '../axiosInstance';

export const GET_PATIENT = 'GET_PATIENT';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const REQUEST_PATIENT = 'REQUEST_PATIENT';
export const REQUEST_PATIENT_CREATE = 'REQUEST_PATIENT_CREATE';
export const RECEIVE_PATIENT = 'RECEIVE_PATIENT';
export const INVALIDATE_PATIENT = 'INVALIDATE_PATIENT';

export const requestPatient = () => ({
  type: REQUEST_PATIENT,
});

export const requestCreatePatient = () => ({
  type: REQUEST_PATIENT_CREATE,
});

export const receivePatient = response => ({
  type: RECEIVE_PATIENT,
  payload: response.data.data,
});

export const invalidatePatient = () => ({
  type: INVALIDATE_PATIENT,
});

export const receiveUpdatedPatient = () => ({
  type: UPDATE_PATIENT,
});

export const createPatient = async (dispatch, patientId, email, getTokenCb) => {
  const token = await getTokenCb();
  dispatch(requestCreatePatient(dispatch));

  axios.post(`/api/users/patient/${patientId}`, { username: email }, { headers: { Authorization: `Bearer ${token}` } })
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

export const updatePatient = async (
  dispatch,
  patientId,
  fullName,
  medHistory,
  getTokenCb) => {
  const token = await getTokenCb();

  dispatch(requestPatient(dispatch));

  axios.put(`/api/users/patient/${patientId}`, { fullName, medHistory }, { headers: { Authorization: `Bearer ${token}` } })
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
