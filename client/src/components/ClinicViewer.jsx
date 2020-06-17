import React from 'react';
import { Button, Grid, ListItem, List, ListItemText, Divider, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import TextResponse from './common/TextResponse';
import LoadingMessage from './common/LoadingMesage';
import { getClinics, getProjectedClinicDetails } from '../redux/actions/clinicActions';
import CheckBoxes from './common/CheckBoxes';

const ClinicViewer = () => {
  const clinicsState = useSelector(state => state.clinics);
  const dispatch = useDispatch();
  const [cityName, setCityName] = React.useState('');
  const getClinicsOnClick = () => {
    if (!clinicsState.isFetchingClinics) {
      if (!clinicsState) {
        return <TextResponse heading='No clinics found.' body='Please contact administrator' />;
      }
      if (clinicsState.selectedCols.includes('all')) {
        getClinics(dispatch, cityName);
      } else {
        getProjectedClinicDetails(dispatch, clinicsState.selectedCols, cityName);
      }
    }
    return <LoadingMessage heading='Please wait' body='Loading clinics...' />;
  };
  const onChangeCityName = e => {
    setCityName(e.target.value);
  };

  if (clinicsState.didInvalidateClinics) {
    return <TextResponse heading='Error getting clinics info from server' body='Please contact administrator.' />;
  }

  if (clinicsState.isFetchingClinics) {
    return <LoadingMessage heading='Please wait' body='Loading clinics...' />;
  }

  return (
    <div>
      <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12}>
          <TextResponse heading='Find clinics in your city' />
        </Grid>
      </Grid>
      <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12}>
          <TextField placeholder='City name' onChange={onChangeCityName} />
          <Button color='primary' onClick={getClinicsOnClick}> Filtered Search </Button>
        </Grid>
        <Grid item xs={12}>
          <CheckBoxes cityName={cityName} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          { clinicsState.responseData !== null
         && (
         <List>
           {clinicsState.responseData.map(clinic => (
             <>
               <ListItem button key={`${clinic.id}`}>
                 <ListItemText
                   key={`${clinic.id}`}
                   primary={`${(clinic.name) ? `Name: ${clinic.name}` : ''} ${(clinic.opening_time) ? `| Opening time: ${clinic.opening_time}` : ''} ${(clinic.closing_time) ? `|  Closing time:${clinic.closing_time}` : ''} ${(clinic.days_open) ? ` |
                   Days open: ${clinic.days_open}` : ''} ${(clinic.postal_code) ? ` | Postal code:${clinic.postal_code}` : ''} `}
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
