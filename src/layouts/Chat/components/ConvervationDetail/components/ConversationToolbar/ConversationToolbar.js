import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core";
import {
  Toolbar,
  Typography
} from "@material-ui/core";
import moment from 'moment-timezone';
import clsx from "clsx";
import StatusBullet from '../../../../../../components/StatusBullet';
import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff"
  },
  user: {
    flexShrink: 0,
    flexGrow: 1
  },
  activity: {
    display: "flex",
    alignItems: "center"
  },
  statusBullet: {
    marginRight: theme.spacing(1)
  }
}));


const ConversationToolbar = (props) => {
  const { conversation, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Toolbar {...rest} className={clsx(classes.root, className)}>
      <div className={classes.user}>
        <Typography variant='h6'>{get(conversation, 'username', '')}</Typography>
        <div className={classes.activity}>
          {get(conversation, 'active', false) ? (
            <Fragment>
              <StatusBullet
                className={classes.statusBullet}
                color='success'
                size='small'
              />
              <Typography variant='body2'>Active now</Typography>
            </Fragment>
          ) : (
              <Typography variant='body2'>
                Active {moment(get(conversation, 'lastActivity')).fromNow()}
              </Typography>
            )}
        </div>
      </div>
    </Toolbar>
  );
};

export default ConversationToolbar;