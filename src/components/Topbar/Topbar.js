import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none"
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={classes.root} color='primary'>
      <Toolbar>
        <Link to='/'>
          <img alt='Logo' src='/images/logos/logo.png' />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
