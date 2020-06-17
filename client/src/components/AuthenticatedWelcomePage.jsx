/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextResponse from './common/TextResponse';

const useStyles = makeStyles({
  root: {
    width: 280,
    height: 280,
    margin: '40px',
  },
  media: {
    height: 180,
  },
});

const AuthenticatedWelcomePage = () => {
  const history = createHistory({ forceRefresh: true });
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextResponse heading='Welcome to clinic recommender' body='Here are a few things you can do: ' />
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea onClick={() => history.push('/clinics')}>
            <CardMedia
              className={classes.media}
              image='https://blogs.ubc.ca/theedventure/files/2015/12/de1_0506.jpg'
            />
            <CardContent>
              <Typography gutterBottom align='center' variant='h6' component='h2'>
                FIND CLINICS NEAR YOU
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea onClick={() => history.push('/doctors')}>
            <CardMedia
              className={classes.media}
              image='https://www.hr.ubc.ca/benefits-fyi/files/2013/03/find-a-doctor-483x328.jpg'
            />
            <CardContent>
              <Typography gutterBottom align='center' variant='h6' component='h2'>
                FIND DOCTOR RATINGS
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea onClick={() => history.push('/specialclinics')}>
            <CardMedia
              className={classes.media}
              image='https://image.freepik.com/free-vector/start_53876-25533.jpg'
            />
            <CardContent>
              <Typography gutterBottom align='center' variant='h6' component='h2'>
                🌟FIND ALL STAR CLINICS 🌟
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthenticatedWelcomePage;
