import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Box, List, ListItem, Typography, Button } from '@material-ui/core';
import createHistory from 'history/createBrowserHistory';
import { useAuth0 } from '../authentication/react-auth0-spa';
import colors from '../constants/colors';
import { updatePatient } from '../redux/actions/patientActions';

const history = createHistory({ forceRefresh: true });

const useStyles = makeStyles({
  main: {
    backgroundColor: colors.lightBlue,
    width: '50%',
    margin: '0 auto',
  },
  btnCont: {
    width: '50%',
    margin: '0 auto',
  },
  btn: {
    color: colors.darkBlue,
    backgroundColor: colors.lightBlue,
    margin: 10,
  },
  box: {
    width: '100%',
    margin: 20,
  },
  textField: {
    marginBottom: 25,
    color: colors.darkBlue,
    borderColor: colors.lightBlue,
  },
  heading: {
    marginTop: 20,
    color: colors.darkBlue,
  },
  allergy: {
    marginTop: 30,
    marginBottom: 15,
  },
});

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const patientState = useSelector(state => state.patient);
  const { getTokenSilently } = useAuth0();
  const [info, setInfo] = useState({
    email: '',
    fullName: '',
    guardianName: '',
    height: '',
    weight: '',
    profilePicUrl: '',
    allergies: patientState.allergies,
  });

  const [allergy, setAllergy] = useState({
    name: '',
    comment: '',
  });

  const savePatientInfo = () => {
    updatePatient(
      dispatch,
      patientState.id,
      info.fullName,
      {
        guardianName: info.guardianName,
        height: info.height,
        weight: info.weight,
        allergies: info.allergies,
      },
      info.profilePicUrl,
      getTokenSilently,
    );
    if (patientState.medHistory.id) {
      history.push('/');
    }
  };

  const addAllergy = () => {
    if (allergy.name && allergy.comment) {
      const newAlllergies = info.allergies;
      newAlllergies.push({ ...allergy, new: true });
      setInfo({ ...info, allergies: newAlllergies });
      setAllergy({ name: '', comment: '' });
    }
  };

  return (
    <>
      <Paper elevation={3} className={classes.main}>
        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <Typography className={classes.heading} variant='h3'>Patient Information</Typography>
        </Box>

        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <List>
            {patientState.email && (
            <ListItem key={1} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Email: ${patientState.email}`}</Typography>
            </ListItem>
            )}
            {patientState.fullName && (
            <ListItem key={2} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Full Name: ${patientState.fullName}`}</Typography>
            </ListItem>
            )}
            {patientState.profile_picture_url && (
            <ListItem key={3} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Profile Picture URL: ${patientState.profile_picture_url}`}</Typography>
            </ListItem>
            )}
            {patientState.medHistory.guardian_name && (
            <ListItem key={4} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Guardian Name: ${patientState.medHistory.guardian_name}`}</Typography>
            </ListItem>
            )}
            {patientState.medHistory.height && (
            <ListItem key={5} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Height: ${patientState.medHistory.height}`}</Typography>
            </ListItem>
            )}
            {patientState.medHistory.weight && (
            <ListItem key={6} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Weight: ${patientState.medHistory.weight}`}</Typography>
            </ListItem>
            )}
          </List>
        </Box>
      </Paper>

      <Paper elevation={5} className={classes.main}>
        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <Typography className={classes.heading} variant='h5'>Update Information</Typography>
        </Box>
        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <List>
            <ListItem key={1} role={undefined} dense>
              <TextField className={classes.textField} label='Full Name' onChange={event => setInfo({ ...info, fullName: event.target.value })} />
            </ListItem>
            <ListItem key={2} role={undefined} dense>
              <TextField className={classes.textField} label='Profile Picture URL' onChange={event => setInfo({ ...info, profilePicUrl: event.target.value })} />
            </ListItem>
            <ListItem key={3} role={undefined} dense>
              <TextField className={classes.textField} label='Guardian Name' onChange={event => setInfo({ ...info, guardianName: event.target.value })} />
            </ListItem>
            <ListItem key={4} role={undefined} dense>
              <TextField className={classes.textField} label='Height' onChange={event => setInfo({ ...info, height: event.target.value })} />
            </ListItem>
            <ListItem key={5} role={undefined} dense>
              <TextField className={classes.textField} label='Weight' onChange={event => setInfo({ ...info, weight: event.target.value })} />
            </ListItem>
          </List>
        </Box>

        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <Typography className={classes.heading} variant='h5'>Allergies Information</Typography>
        </Box>

        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <List>
            <ListItem key={1} role={undefined} dense>
              <TextField className={classes.textField} label='Allergy Name' onChange={event => setAllergy({ ...allergy, name: event.target.value })} />
            </ListItem>
            <ListItem key={2} role={undefined} dense>
              <TextField className={classes.textField} label='Comment' onChange={event => setAllergy({ ...allergy, comment: event.target.value })} />
              <Button variant='outlined' className={classes.btn} onClick={addAllergy}>Add</Button>
            </ListItem>
            {info.allergies.map((a, index) => (

              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={`all${index}`} role={undefined} dense>
                <Typography className={classes.heading} variant='body'>{`Name: ${a.name}, Comment: ${a.comment}`}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={0} className={classes.btCont}>
        <Box
          className={classes.box}
          display='flex'
          width={500}
          alignItems='center'
          justifyContent='center'
        >
          <Link to='/'>
            <Button variant='outlined' className={classes.btn} onClick={savePatientInfo}>Save</Button>
          </Link>
          <Link to='/'>
            <Button variant='outlined' className={classes.btn}>Cancel</Button>
          </Link>
        </Box>
      </Paper>
    </>
  );
}
