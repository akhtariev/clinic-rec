/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { updateSelectedCols } from '../../redux/actions/clinicActions';
import LoadingMessage from './LoadingMesage';
import TextResponse from './TextResponse';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const CheckBoxes = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: false,
    opening_time: false,
    closing_time: false,
    days_open: false,
    postal_code: false,
    all: false,
  });
  const { name, opening_time, closing_time, days_open, postal_code, all } = state;
  const clinicsState = useSelector(state2 => state2.clinics);
  const dispatch = useDispatch();
  const refreshClinicsState = () => {
    if (!clinicsState.isFetchingClinics) {
      if (!clinicsState) {
        return <TextResponse heading='No clinics found.' body='Please contact administrator' />;
      }
      updateSelectedCols(dispatch, Object.entries(state));
    }
    return <LoadingMessage heading='Please wait' body='Loading clinics...' />;
  };
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component='fieldset' className={classes.formControl}>
      <FormLabel component='legend'>Show only</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={name} onChange={handleChange} name='name' />}
          label='Name'
        />
        <FormControlLabel
          control={<Checkbox checked={opening_time} onChange={handleChange} name='opening_time' />}
          label='Opening Time'
        />
        <FormControlLabel
          control={<Checkbox checked={closing_time} onChange={handleChange} name='closing_time' />}
          label='Closing Time'
        />
        <FormControlLabel
          control={<Checkbox checked={days_open} onChange={handleChange} name='days_open' />}
          label='Days open'
        />
        <FormControlLabel
          control={<Checkbox checked={postal_code} onChange={handleChange} name='postal_code' />}
          label='Postal code'
        />
        <FormControlLabel
          control={<Checkbox checked={all} onChange={handleChange} name='all' />}
          label='All'
        />
      </FormGroup>
      <FormHelperText>This will project only the columns you have selected in the result below</FormHelperText>
      <Button color='primary' onClick={refreshClinicsState}> Confirm </Button>
    </FormControl>
  );
};

export default CheckBoxes;
