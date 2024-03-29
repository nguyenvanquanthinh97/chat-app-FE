import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: '5rem',
  }
}));

const TextBox = ({ label, value, handleChange, validator, autoFocus, type, errorMessages }) => {
  return (
    <Fragment>
      <TextField helperText={errorMessages} error={validator} type={type || 'text'} label={label} value={value} onChange={handleChange} variant="outlined" autoFocus={autoFocus} fullWidth />
    </Fragment>
  );
};

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  validator: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  errorMessages: PropTypes.array
};

export default TextBox;