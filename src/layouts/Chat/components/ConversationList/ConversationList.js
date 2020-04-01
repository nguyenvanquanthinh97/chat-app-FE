import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  List
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';

import SearchForm from '../../../../components/SearchForm';
import ConversationListItem from './ConversationListItem';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff",
    overflow: "auto"
  }
}));

const ConversationList = (props) => {
  const { conversations, className, match, ...rest } = props;
  const [stateInput, setStateInput] = useState('');
  const [searchedConversations, setSearchedConversation] = useState([]);

  const classes = useStyles();
  const selectedConversation = match.params.id;

  useEffect(() => {
    setSearchedConversation(conversations);
  }, [conversations])

  const handleSearch = (event) => {
    const username = event.target.value;
    const searchResult = conversations.filter(el => el.username.includes(username));
    setSearchedConversation(searchResult);
    setStateInput(username);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <SearchForm value={stateInput} handleInput={handleSearch} placeholder="Search Username" />
      <Divider />
      <List disablePadding>
        {searchedConversations.map((conversation, i) => (
          <ConversationListItem
            path={props.path}
            active={conversation.id === selectedConversation}
            conversation={conversation}
            divider={i < searchedConversations.length - 1}
            key={conversation.id}
          />
        ))}
      </List>
    </div>
  );
};

// ConversationList.propTypes = {
//   conversation: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       messages: PropTypes.arrayOf(PropTypes.shape({
//         content: PropTypes.string,
//         createdAt: PropTypes.string
//       })),
//       username: PropTypes.string,
//       avatar: PropTypes.string,
//       unread: PropTypes.number
//     })
//   )
// };

export default withRouter(ConversationList);