import { combineReducers } from 'redux';
import patientReducer from './patientReducer';
import clinicReducer from './clinicReducer';
import doctorReducer from './doctorReducer';

const rootReducer = combineReducers({
  patient: patientReducer,
  clinics: clinicReducer,
  doctors: doctorReducer,
});

export default rootReducer;
