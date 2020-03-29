import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from "clsx";

import Topbar from '../Topbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  topbar: {
    height: theme.spacing(8),
    position: "relative"
  },
  mainTheme: {
    height: "calc(100% - 64px)"
  }
}));

const PageWrapper = (props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <Topbar className={classes.topbar}/>
      <div className={clsx(classes.mainTheme)}>
        {props.children}
      </div>
    </div>
  );
};

export default PageWrapper;