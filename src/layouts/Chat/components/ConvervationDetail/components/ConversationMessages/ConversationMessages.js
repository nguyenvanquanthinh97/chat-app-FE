import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

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

const ConversationMessages = ({ messages, loading, className, match, socket, setUnreadMessagesToRead, avatar, otherUserAvatar, staticContext, ...props }) => {

  const loadingMessage = {
    sender: {
      authUser: true,
      avatar: avatar,
      content: 'Sending file Please wait ...',
      contentType: 'text',
      createdAt: moment()
    }
  };

  const classes = useStyles();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    if (socket) {
      socket.emit("readMessagesFromRoom", match.params.id);
    }
    if (messages) {
      setUnreadMessagesToRead(match.params.id);
    }
  }, [messages.length]);

  return (
    <div
      {...props}
      className={clsx(classes.root, className)}
      ref={bottomRef}
    >
      <div className={classes.inner}>
        {messages.map((message, idx) => {
          return (
            <ConversationMessage
              key={idx}
              message={message}
              otherUserAvatar={otherUserAvatar}
            />
          );
        })}
        {loading && (<ConversationMessage key='waiting message' message={loadingMessage} />)}
      </div>
    </div>
  );
};

ConversationMessages.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  socket: state.chat.socket,
  avatar: state.auth.avatar
});

const mapDispatchToProps = dispatch => ({
  setUnreadMessagesToRead: (roomId) => dispatch(actions.chatSetUnreadMessagesToRead(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConversationMessages));
