import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Box, List, ListItem, Typography, Button } from '@material-ui/core';
import { useAuth0 } from '../authentication/react-auth0-spa';
import colors from '../constants/colors';
import { updatePatient } from '../redux/actions/patientActions';

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
  });

  const savePatientInfo = () => {
    updatePatient(
      dispatch,
      patientState.id,
      info.fullName,
      { guardianName: info.guardianName, height: info.height, weight: info.weight },
      getTokenSilently,
    );
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
            <ListItem key={1} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Full Name: ${patientState.fullName}`}</Typography>
            </ListItem>
            )}
            {patientState.medHistory.guardian_name && (
            <ListItem key={1} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Guardian Name: ${patientState.medHistory.guardian_name}`}</Typography>
            </ListItem>
            )}
            {patientState.medHistory.height && (
            <ListItem key={1} role={undefined} dense>
              <Typography className={classes.heading} variant='h6'>{`Height: ${patientState.medHistory.height}`}</Typography>
            </ListItem>
            )}
            {patientState.medHistory.weight && (
            <ListItem key={1} role={undefined} dense>
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
            <ListItem key={2} role={undefined} dense>
              <TextField className={classes.textField} id='standard-basic' label='Full Name' onChange={event => setInfo({ ...info, fullName: event.target.value })} />
            </ListItem>
            <ListItem key={1} role={undefined} dense>
              <TextField className={classes.textField} id='standard-basic' label='Guardian Name' onChange={event => setInfo({ ...info, guardianName: event.target.value })} />
            </ListItem>
            <ListItem key={2} role={undefined} dense>
              <TextField className={classes.textField} id='standard-basic' label='Height' onChange={event => setInfo({ ...info, height: event.target.value })} />
            </ListItem>
            <ListItem key={2} role={undefined} dense>
              <TextField className={classes.textField} id='standard-basic' label='Weight' onChange={event => setInfo({ ...info, weight: event.target.value })} />
            </ListItem>
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
