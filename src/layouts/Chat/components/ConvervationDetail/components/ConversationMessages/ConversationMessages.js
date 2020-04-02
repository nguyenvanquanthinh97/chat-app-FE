import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ConversationMessage from './ConversationMessage';
import * as actions from '../../../../../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    height: '100%'
  },
  inner: {
    padding: theme.spacing(2)
  }
}));

const ConversationMessages = props => {
  const { messages, className, match, socket, setUnreadMessagesToRead, ...rest } = props;


  const classes = useStyles();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    if (socket) {
      socket.emit("readMessagesFromRoom", match.params.id);
    }
    if(messages) {
      setUnreadMessagesToRead(match.params.id)
    }
  }, [messages.length]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
      ref={bottomRef}
    >
      <div className={classes.inner}>
        {messages.map(message => {
          return (
            <ConversationMessage
              key={message.id}
              message={message}
            />
          );
        })}
      </div>
    </div>
  );
};

ConversationMessages.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  socket: state.chat.socket
});

const mapDispatchToProps = dispatch => ({
  setUnreadMessagesToRead: (roomId) => dispatch(actions.chatSetUnreadMessagesToRead(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationMessages));
