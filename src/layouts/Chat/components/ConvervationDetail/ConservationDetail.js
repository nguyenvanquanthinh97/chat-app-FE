import React, { useState } from 'react';
import PropTypes from "prop-types";
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';

import ConversationToolbar from './components/ConversationToolbar';
import ConversationMessages from './components/ConversationMessages';
import ConversationForm from './components/ConversationForm';
import './style.scss';
import Image from '../../../../components/Image';

const ConversationDetail = ({ conversation, className, match, socket, staticContext, ...props }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const roomId = get(match, 'params.id');

  const removeImagePreview = () => {
    setImagePreview(null);
  };

  return (
    <div {...props} className="container">
      <div className="toolbar">
        <ConversationToolbar conversation={conversation} />
      </div>
      <div className="main-content">
        <div className={imagePreview ? "conversation-messages--has-image-preview" : "conversation-messages"}>
          <ConversationMessages otherUserAvatar={get(conversation, 'avatar', null)} loading={get(conversation, 'loading', false)} messages={get(conversation, 'messages', [])} />
        </div>
        {imagePreview && (
          <div className="image-preview__area">
            <div onClick={removeImagePreview} className="image-preview">
              <Image imageUrl={imagePreview} enableHover />
            </div>
          </div>)}
        <ConversationForm imagePreview={imagePreview} setImagePreview={setImagePreview} roomId={roomId} className="conversation-input" />
      </div>
    </div>
  );
};

ConversationDetail.propTypes = {
  conversation: PropTypes.object
};

export default withRouter(ConversationDetail);