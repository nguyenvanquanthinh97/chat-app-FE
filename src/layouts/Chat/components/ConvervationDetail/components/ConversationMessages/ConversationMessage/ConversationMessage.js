import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import { get } from 'lodash';
import { Typography, Link, Avatar, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  authUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& $body': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  inner: {
    display: 'flex',
    maxWidth: 500
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  body: {
    backgroundColor: colors.grey[100],
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2)
  },
  content: {
    marginTop: theme.spacing(1)
  },
  image: {
    marginTop: theme.spacing(2),
    height: 'auto',
    width: 380,
    maxWidth: '100%'
  },
  footer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  link: {
    color: "#fff"
  }
}));

const ConversationMessage = props => {
  const { message, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(
        classes.root,
        {
          [classes.authUser]: get(message, 'sender.authUser', false)
        },
        className
      )}
    >
      <div className={classes.inner}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={get(message, 'sender.avatar', '')}
          to="/profile/1/timeline"
        />
        <div>
          <div className={classes.body}>
            <div>
              <Link
                color="inherit"
                component={RouterLink}
                to="/profile/1/timeline"
                variant="h6"
              >
                {get(message, 'sender.authUser') ? 'Me' : get(message, 'sender.username')}
              </Link>
            </div>
            <div className={classes.content}>
              {message.sender.contentType === 'image' && (
                <img
                  alt="Attachment"
                  className={classes.image}
                  src={message.sender.content}
                />
              )}
              {message.sender.contentType === 'text' && (
                <Typography
                  color="inherit"
                  variant="body1"
                >
                  {message.sender.content}
                </Typography>
              )}
              {
                message.sender.contentType === 'file' && (
                  <Typography
                    color="inherit"
                    variant="body1"
                  >
                    <a className={classes.link} href={message.sender.content}>{message.sender.content}</a>
                  </Typography>
                )
              }
            </div>
          </div>
          <div className={classes.footer}>
            <Typography
              className={classes.time}
              variant="body2"
            >
              {moment(message.sender.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

ConversationMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

export default ConversationMessage;
