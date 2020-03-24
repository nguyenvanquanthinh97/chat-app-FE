import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ButtonComponent = (props) => {
  const classes = useStyles();
  const { text, handleClick, disabled } = props;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AccountCircleIcon />}
        onClick={handleClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </div>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default ButtonComponent;