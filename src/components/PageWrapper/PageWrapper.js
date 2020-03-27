import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from "clsx";

import Topbar from '../Topbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  mainTheme: {
    paddingTop: theme.spacing(8),
    height: "calc(100% - 64px)"
  }
}));

const PageWrapper = (props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <Topbar />
      <div className={clsx(classes.mainTheme)}>
        {props.children}
      </div>
    </div>
  );
};

export default PageWrapper;