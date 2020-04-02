import React from 'react';
import { Link } from 'react-router-dom';
import clsx from "clsx";
import moment from "moment-timezone";
import { makeStyles } from "@material-ui/core";
import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  colors
} from "@material-ui/core";
import { get } from 'lodash';

import Label from '../../../../../components/Label';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  active: {
    boxShadow: `inset 4px 0px 0px ${colors.indigo[500]}`,
    backgroundColor: colors.grey[50]
  },
  avatar: {
    height: 40,
    width: 40
  },
  details: {
    marginLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  unread: {
    marginTop: 2,
    padding: 2,
    height: 18,
    minWidth: 18
  }
}));

const ConversationListItem = (props) => {
  const { active, conversation, className, ...rest } = props;
  const classes = useStyles();
  let lastMessage = conversation.messages[conversation.messages.length - 1];

  

  const lastActivity = get(conversation, 'lastActivity');
  let lastActive = conversation.active ? 'Online' : moment(get(conversation, 'lastActivity')).format("LT")
  if(lastActivity === "") {
    lastActive = "Haven't joined yet";
  }
  if (!lastMessage) {
    lastMessage = { sender: { content: `You and ${get(conversation, 'username')} now can talk eachother`, createdAt: moment().format() } };
  } else {
    lastMessage = lastMessage;
  }
  return (
    <ListItem
      {...rest}
      button
      className={
        clsx({
          [classes.active]: active
        },
          className
        )
      }
      component={Link}
      to={`/chat/${get(conversation, 'id', '1')}`}
    >
      <ListItemAvatar>
        <Avatar
          alt="avatar"
          className={classes.avatar}
          src={get(conversation, 'avatar', '/images/avatars/user-avatar.jpg')}
        />
      </ListItemAvatar>
      <ListItemText
        primary={get(conversation, 'username', 'Username')}
        primaryTypographyProps={{
          noWrap: true,
          variant: "h6"
        }}
        secondary={lastMessage.sender.content}
        secondaryTypographyProps={{
          noWrap: true,
          variant: "body1"
        }}
      >

      </ListItemText>
      <div className={classes.details}>
        <Typography noWrap variant='body2'>
          {
            lastActive
          }
          {/* {moment(lastMessage.sender.createdAt).isSame(moment(), "day")
            ? moment(lastMessage.sender.createdAt).format("LT")
            : moment(lastMessage.sender.createdAt).fromNow()} */}
        </Typography>
        {conversation.unread > 0 && (
          <Label
            className={classes.unread}
            color={colors.red[500]}
            shape='rounded'>
            {conversation.unread}
          </Label>
        )}
      </div>
    </ListItem>
  );
};

// ConversationListItem.propTypes = {
//   active: PropTypes.bool.isRequired,
//   conversation: PropTypes.shape({
//     id: PropTypes.string,
//     messages: PropTypes.arrayOf(PropTypes.shape({
//       content: PropTypes.string,
//       createdAt: PropTypes.string
//     })),
//     username: PropTypes.string,
//     avatar: PropTypes.string,
//     unread: PropTypes.number
//   })
// }

export default ConversationListItem;