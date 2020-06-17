/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import axios from '../axiosInstance';

export const GET_CLINICS = 'GET_CLINICS';
export const RECEIVE_CLINICS = 'RECEIVE_CLINICS';
export const REQUEST_CLINICS = 'REQUEST_CLINICS';
export const INVALIDATE_CLINICS = 'INVALIDATE_CLINICS';
export const REQUEST_ALLSTARS = 'REQUEST_ALLSTARS';
export const INVALIDATE_ALLSTARS = 'INVALIDATE_ALLSTARS';
export const RECEIVE_ALLSTARS = 'RECEIVE_ALLSTARS';
export const RECEIVE_PROJ_CLINICS = 'RECEIVE_PROJ_CLINICS';
export const UPDATED_SELECTED_COLS = 'UPDATE_SELECTED_COLS';

export const requestClinics = () => ({
  type: REQUEST_CLINICS,
});

export const requestAllStarClinics = () => ({
  type: REQUEST_ALLSTARS,
});

export const receiveClinics = response => ({
  type: RECEIVE_CLINICS,
  payload: response.data,
});

export const receiveProjectedClinics = response => ({
  type: RECEIVE_PROJ_CLINICS,
  payload: response.data,
});

export const updateSelectedColsState = colsList => ({
  type: UPDATED_SELECTED_COLS,
  payload: colsList,
});

export const receiveAllStarClinics = response => ({
  type: RECEIVE_ALLSTARS,
  payload: response.data,
});

export const invalidateClinics = () => ({
  type: INVALIDATE_CLINICS,
});

export const invalidateAllStarClinics = () => ({
  type: INVALIDATE_ALLSTARS,
});

export const getClinics = async (dispatch, cityName) => {
  dispatch(requestClinics(dispatch));

  axios.get(`/api/clinic/getClinicDetailsInCity/${cityName}`)
    .then(
      response => {
        dispatch(receiveClinics(response));
      },
      error => {
        console.log(`Error fetching clinics for city:${cityName}`, error);
        dispatch(invalidateClinics());
      },
    );
};

export const getAllStarClinics = async (dispatch, cityName) => {
  dispatch(requestAllStarClinics(dispatch));

  axios.get(`/api/clinic/getClinicsWithAllSpecialities/${cityName}`)
    .then(
      response => {
        dispatch(receiveAllStarClinics(response));
      },
      error => {
        console.log(`Error fetching clinics for city:${cityName}`, error);
        dispatch(invalidateAllStarClinics());
      },
    );
};

export const getProjectedClinicDetails = async (dispatch, colList, cityName) => {
  axios.post(`/api/clinic/getDynamicClinicDetails/${cityName}`, { colNames: colList })
    .then(
      response => {
        dispatch(receiveProjectedClinics(response));
      },
      error => {
        console.log(`Error fetching clinics for city:${cityName}`, error);
      },
    );
};

export const updateSelectedCols = (dispatch, colListEntries) => {
  // eslint-disable-next-line no-var
  var colList = [];
  for (const [key, value] of colListEntries) {
    if (value) {
      if (key === 'postal_code') { colList.push('c.postal_code'); } else { colList.push(key); }
    }
  }
  dispatch(updateSelectedColsState(colList));
};
