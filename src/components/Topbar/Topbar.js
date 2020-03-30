import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { ExitToApp } from '@material-ui/icons';
import { connect } from 'react-redux';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    display: "flex"
  },
  button: {
    marginLeft: "auto"
  }
}));

const Topbar = props => {
  const { className, isLogin, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color='primary'>
      <Toolbar>
        <Link to='/'>
          <img alt='Logo' src='/images/logos/logo.png' />
        </Link>
        {isLogin && <Link className={classes.button} to="/auth/logout">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ExitToApp />}
          >
            Logout
          </Button>
        </Link>}
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  isLogin: PropTypes.bool
};

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin
});

export default connect(mapStateToProps)(Topbar);
