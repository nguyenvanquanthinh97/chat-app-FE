import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Input, IconButton, Tooltip } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  searchInput: {
    flextGrow: 1
  }
}));

const SearchForm = (props) => {
  const classes = useStyles;
  const { value, placeholder, handleInput, ...rest } = props;

  return (
    <div {...rest}>
      <Toolbar>
        <Input
          value={value}
          onChange={handleInput}
          className={classes.searchInput}
          placeholder={placeholder}
          disableUnderline
        />
        <Tooltip title="Search">
          <IconButton>
            <Search edge="end" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </div>
  );
};

SearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default SearchForm;