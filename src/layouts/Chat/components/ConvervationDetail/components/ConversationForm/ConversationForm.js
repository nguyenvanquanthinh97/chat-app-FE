import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@material-ui/core';
import { Send as SendIcon, AddPhotoAlternate as AddPhotoIcon, AttachFile as AttachFileIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { set } from 'lodash';

import * as actions from '../../../../../../store/actions';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff",
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

const ConversationForm = props => {
  const { className, avatar, roomId, sendMessage, username, socket, ...rest } = props;

  const classes = useStyles();

  const [value, setValue] = useState('');

  const fileInputRef = useRef(null);

  const sender = {
    avatar: avatar
  };

  const handleChange = event => {
    event.persist();

    setValue(event.target.value);
  };

  const keyPressed = event => {
    if(event.which === 13) {
      onSendHandler();
    }
  }

  const onSendHandler = (event) => {
    if (value === '') {
      return;
    }
    const message = {
      username: username,
      avatar: avatar,
      content: value,
      contentType: "text",
      createdAt: moment()
    };
    sendMessage(socket, message, roomId);
    setValue("");
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        src={sender.avatar}
      />
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <Input
          className={classes.input}
          disableUnderline
          autoFocus
          value={value}
          onKeyPress={keyPressed}
          onChange={handleChange}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip onClick={onSendHandler} title="Send">
        <IconButton color={value.length > 0 ? 'primary' : 'default'}>
          <SendIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} />
      <Tooltip title="Attach photo">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AddPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Attach file">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
};

ConversationForm.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  username: state.auth.username,
  avatar: state.auth.avatar,
  socket: state.chat.socket
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (socket, message, roomId) => dispatch(actions.chatSendMessageInit(socket, message, roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationForm);
