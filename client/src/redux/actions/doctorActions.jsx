import axios from '../axiosInstance';

export const GET_DOCTORS = 'GET_DOCTORS';
export const RECEIVE_DOCTORS = 'RECEIVE_DOCTORS';
export const REQUEST_DOCTORS = 'REQUEST_DOCTORS';
export const INVALIDATE_DOCTORS = 'INVALIDATE_DOCTORS';

export const requestDoctors = () => ({
  type: REQUEST_DOCTORS
});

export const receiveDoctors = response => ({
  type: RECEIVE_DOCTORS,
  payload: response.data,
});

export const invalidateDoctors= () => ({
    type: INVALIDATE_DOCTORS
})

export const getDoctors = async (dispatch, specialty) => {
  dispatch(requestDoctors(dispatch));

  axios.get(`/api/doctor/getAvgDoctorRating/${specialty}`)
    .then(
      response => {
        dispatch(receiveDoctors(response));
      },
      error => {
        console.log(`Error fetching clinics for city:${specialty}`, error);
        dispatch(invalidateDoctors());
      },
    );
};