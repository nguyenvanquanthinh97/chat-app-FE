import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import PageWrapper from '../../components/PageWrapper';
import LoginForm from './components/LoginForm';

const useStyles = makeStyles(theme => ({
  root: {},
  form: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(-8)
  }
}));

const Auth = ({ match }) => {
  const classes = useStyles();
  return (
    <PageWrapper>
      <div className={clsx(classes.form, classes.root)}>
        <LoginForm />
      </div>
    </PageWrapper>
  );
};

export default Auth;