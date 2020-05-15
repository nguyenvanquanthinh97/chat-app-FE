import React from "react";
import { Link } from "react-router-dom";
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

const Topbar = ({ className, isLogin, ...props }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color='primary'>
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

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin
});

export default connect(mapStateToProps, null)(Topbar);
