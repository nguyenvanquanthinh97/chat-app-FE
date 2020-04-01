import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

import ConversationMessage from './ConversationMessage';

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
  const { messages, className, ...rest } = props;

  const classes = useStyles();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
  }, [messages]);

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

export default ConversationMessages;
