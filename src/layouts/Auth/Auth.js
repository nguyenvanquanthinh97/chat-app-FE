import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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

const Auth = ({ isLogin, history }) => {
  const classes = useStyles();

  useEffect(() => {
    if(isLogin) {
      history.push('/chat');
    }
  }, [isLogin])

  return (
    <PageWrapper>
      <div className={clsx(classes.form, classes.root)}>
        <LoginForm />
      </div>
    </PageWrapper>
  );
};

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin
})

export default connect(mapStateToProps)(withRouter(Auth));