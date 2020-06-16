import React from 'react';
import {Button, Grid, ListItem, List, ListItemText, Divider} from '@material-ui/core';
import TextResponse from './common/TextResponse';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import LoadingMessage from './common/LoadingMesage';
import { getDoctors } from '../redux/actions/doctorActions';


const DoctorViewer = () => {
    const doctorsState = useSelector(state => state.doctors); 
    const dispatch  = useDispatch();
    const [specialty, setSpecialty] = React.useState('');
    const getDoctorsOnClick = () => {
        if (!doctorsState.isFetchingDoctors) {
        if (!doctorsState) {
            return <TextResponse heading='No doctors found.' body='Please contact administrator' />;
        }
        getDoctors(dispatch, specialty);
        setSpecialty('');
        return <LoadingMessage heading='Please wait' body='Loading doctors...' />;
      }
  }
  const onChangeSpecialty = (e) => {
      setSpecialty(e.target.value)
  }

 if (doctorsState.didInvalidateDoctors) {
    return <TextResponse heading='Error getting doctors info from server' body='Please contact administrator.' />;
  }

  if (doctorsState.isFetchingDoctors) {
    return <LoadingMessage heading='Please wait' body='Loading doctors...' />;
  }

    return (
        <div>
      <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12} >
          <TextResponse heading="Find doctor ratings by specialty"/>
        </Grid>
      </Grid> 
       <Grid container spacing={3} alignContent='center'>
        <Grid item xs={12}>
          <TextField placeholder='Specialty' onChange={onChangeSpecialty} ></TextField>
          <Button color='primary' onClick={getDoctorsOnClick}> Search </Button> 
        </Grid>
      </Grid>
      <Grid container spacing={3}> 
       <Grid item xs={12}> 
       { doctorsState.responseData !== null && 
         <List> 
          {doctorsState.responseData.map((doctor) => (
            <>
             <ListItem button key={`${doctor.id}`}>
                <ListItemText key={`${doctor.id}`} primary={`${doctor.full_name} | Rating: ${doctor.avg}`} />
             </ListItem>
             <Divider/>
             </>
          ))}
          </List> 
      }
       </Grid>
      </Grid> 
    </div>
    );
}
 
export default DoctorViewer;