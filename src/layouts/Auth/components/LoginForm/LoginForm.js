import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import clsx from "clsx";
import {connect} from 'react-redux';

import * as actions from '../../../../store/actions';
import TextBox from '../../../../components/TextBox';
import Button from '../../../../components/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: "auto"
  },
  warning: {
    color: "red",
    textAlign: "center"
  },
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(2)
    }
  },
  logo: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  img: {
    width: "auto"
  }
}));

const LoginForm = (props) => {

  const classes = useStyles();
  const { className, authLogin, error, ...rest } = props;

  const [emailState, setEmailState] = useState({
    errors: [],
    touched: false,
    content: ''
  });
  const [passwordState, setPasswordState] = useState({
    errors: [],
    touched: false,
    content: ''
  });

  const [validFormState, setValidFormState] = useState(false);

  const schema = {
    email: {
      presence: { allowEmpty: false, message: "is required" },
      email: true
    },
    password: {
      presence: { allowEmpty: false, message: "is required" },
      length: { minimum: 6, message: "minimum length is 6" }
    }
  };

  useEffect(() => {
    if (get(emailState, 'errors', []).length === 0 && get(passwordState, 'errors', []).length === 0) {
      if (emailState.touched === true && passwordState.touched === true) {
        return setValidFormState(true);
      }
    }
    return setValidFormState(false);
  }, [emailState.content, passwordState.content]);

  const emailOnChange = (event) => {
    const email = event.target.value;
    const errors = validate({ email }, { email: schema.email });
    setEmailState({
      touched: true,
      errors: get(errors, 'email'),
      content: email
    });
  };

  const passwordOnChange = (event) => {
    const password = event.target.value;
    const errors = validate({ password }, { password: schema.password });
    setPasswordState({
      touched: true,
      errors: get(errors, 'password'),
      content: password
    });
  };

  const submitHandler = () => {
    const email = get(emailState, "content", "");
    const password = get(passwordState, "content", "");

    authLogin(email, password);
  };

  const hasError = (field) => {
    const errors = get(field, 'errors', []);
    if (field['touched'] && errors.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <form className={clsx(classes.root, className)}>
      {(error && error !== "Invalid Token") && <h4 className={classes.warning}>{error}</h4>}
      <div className={classes.fields}>
        <Avatar alt="Chat Whisper" src="/images/logos/chat-logo.png" className={clsx(classes.logo)} classes={{ img: classes.img }} />
        <TextBox
          label="Email"
          value={get(emailState, 'content')}
          handleChange={emailOnChange}
          validator={hasError(emailState)}
          errorMessages={hasError(emailState) ? get(emailState, 'errors')[0] : null}
          autoFocus />
        <TextBox
          label="Password"
          type="password"
          value={get(passwordState, 'content')}
          handleChange={passwordOnChange}
          validator={hasError(passwordState)}
          errorMessages={hasError(passwordState) ? get(passwordState, 'errors') : null}
        />
        <Button
          disabled={!validFormState}
          text="SIGN IN"
          handleClick={submitHandler}
        />
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
  authLogin: (email, password) => dispatch(actions.authInit(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);