import React from 'react';
import PropTypes from "prop-types";
import { get } from 'lodash';

import ConversationToolbar from './components/ConversationToolbar';
import ConversationMessages from './components/ConversationMessages';
import ConversationForm from './components/ConversationForm';
import './style.scss';

const ConversationDetail = (props) => {
  const { conversation, className, ...rest } = props;

  return (
    <div {...rest} className="container">
      <div className="toolbar">
        <ConversationToolbar conversation={conversation} />
      </div>
      <div className="main-content">
        <div className="conversation-messages">
          <ConversationMessages messages={get(conversation, 'messages', [])} />
        </div>
        <ConversationForm className="conversation-input" />
      </div>
    </div>
  );
};

ConversationDetail.propTypes = {
  conversation: PropTypes.object
};

export default ConversationDetail;