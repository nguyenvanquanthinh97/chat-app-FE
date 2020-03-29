import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

const Logout = ({logout}) => {
  useEffect(() => {
    logout();
  }, []);

  return <Redirect to="/auth/login"/>
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.authLogout())
});

export default connect(null, mapDispatchToProps)(Logout);