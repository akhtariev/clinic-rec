import React from 'react';
import { Button, Grid, ListItem, List, ListItemText, Divider, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import TextResponse from './common/TextResponse';
import LoadingMessage from './common/LoadingMesage';
import { getAllStarClinics } from '../redux/actions/clinicActions';

const ClinicViewer = () => {
  const clinicsState = useSelector(state => state.clinics);
  const dispatch = useDispatch();
  const [cityName, setCityName] = React.useState('');
  const getClinicsOnClick = () => {
    if (!clinicsState.isFetchingAllStars) {
      if (!clinicsState) {
        return <TextResponse heading='No all star clinics found.' body='Please contact administrator' />;
      }
      getAllStarClinics(dispatch, cityName);
      setCityName('');
    }
    return <LoadingMessage heading='Please wait' body='Loading all star clinics...' />;
  };
  const onChangeCityName = e => {
    setCityName(e.target.value);
  };

  if (clinicsState.didInvalidateAllStars) {
    return <TextResponse heading='Error getting all star clinics info from server' body='Please contact administrator.' />;
  }

  if (clinicsState.isFetchingAllStars) {
    return <LoadingMessage heading='Please wait' body='Loading all star clinics...' />;
  }

  return (
    <div>
      <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12}>
          <TextResponse heading='🌟Find all star clinics in your city 🌟' body='These are clinics which have doctors that serve ALL specialities: Cardiology, Dermatology, Gynecology, Neurology and Pediatrics. What more can you ask for? ' />
        </Grid>
      </Grid>
      <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12}>
          <TextField placeholder='City name' onChange={onChangeCityName} />
          <Button color='primary' onClick={getClinicsOnClick}> Search </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          { clinicsState.allStarResponseData !== null
         && (
         <List>
           {clinicsState.allStarResponseData.map(clinic => (
             <>
               <ListItem button key={`${clinic.id}`}>
                 <ListItemText
                   key={`${clinic.id}`}
                   primary={`${clinic.name} | Operating hours: ${clinic.opening_time} - ${clinic.closing_time} |
                 Days open: ${clinic.days_open} | Postal code: ${clinic.postal_code}`}
                 />
               </ListItem>
               <Divider />
             </>
           ))}
         </List>
         )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ClinicViewer;
