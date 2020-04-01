import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

const Logout = ({socket, logout, closeSocket}) => {
  useEffect(() => {
    logout();
    closeSocket(socket);
  }, []);

  return <Redirect to="/auth/login"/>
};

const mapStateToProps = state => ({
  socket: state.chat.socket
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.authLogout()),
  closeSocket: (socket) => dispatch(actions.chatAuthClose(socket))
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);