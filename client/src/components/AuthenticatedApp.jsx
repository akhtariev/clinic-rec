import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../authentication/react-auth0-spa';
import { getPatient, createPatient } from '../redux/actions/patientActions';
import colors from '../constants/colors';
import TextResponse from './common/TextResponse';
import LoadingMessage from './common/LoadingMesage';
import URN_CLIENT from '../constants/config';
import ClinicViewer from './ClinicViewer';

const useStyles = makeStyles(theme => ({
  content: {
    color: theme.palette.secondary.main,
    backgroundColor: colors.white,
    margin: '2% 10%',
  },
}));

const AuthenticatedApp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { getTokenSilently, user } = useAuth0();
  const userState = useSelector(state => state.user);

  // if (userState === undefined) {
  //   return (
  //     <React.Fragment>
  //     <TextResponse heading='Technical issue...' body='Please contact administrator' />
  //     <Switch>
  //             <Route
  //               path='/test'
  //               exact
  //               component={() => (
  //                 <TextResponse
  //                   startLevel='This is test'
  //                   titleText='Ignore'
  //                 />
  //               )}
  //             />
  //           </Switch>
  //     <Button variant='contained' color='primary'> View all Clinics </Button>
  //     </React.Fragment>
  //   )
  // }

  // if (userState.id === null && !userState.isFetching) {
  //   if (!user) {
  //     return <TextResponse heading='No user found.' body='Please contact administrator' />;
  //   }
  //   const namespace = URN_CLIENT;
  //   const newPatient = user[`${namespace}/newUser`];
  //   const auth0Prefix = 'auth0|';

  //   if (newPatient) {
  //     createPatient(dispatch, user.sub.substring(auth0Prefix.length), user.nickname, getTokenSilently);
  //   } else {
  //     getPatient(dispatch, user.sub.substring(auth0Prefix.length), getTokenSilently);
  //   }

  //   return <LoadingMessage heading='Please wait' body='Loading patient...' />;
  // }
  // if (userState.didInvalidate) {
  //   return <TextResponse heading='Error getting user info from server' body='Please contact administrator.' />;
  // }
  // if (userState.isFetching) {
  //   return <LoadingMessage heading='Please wait' body='Loading patient...' />;
  // }

  return (
    <>
      <Grid container>
        <Grid item sm>
          <Box className={classes.content}>
            <Switch>
              <Route
                path='/test'
                exact
                component={() => (
                <h1> Hello </h1> 
                )}
              />
              <Route
                 path='/clinics'
                 exact 
                 component = { 
                   () => (
                     <ClinicViewer/>
                   )
                 }/>
            </Switch>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthenticatedApp;
