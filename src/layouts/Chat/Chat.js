import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import axios from "axios";

import ConversationList from './components/ConversationList';
import ConversationDetail from './components/ConvervationDetail';
import PageWrapper from '../../components/PageWrapper';
import "./style.scss";

const Chat = (props) => {
  const { match, ...rest } = props;
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setConversations(
      [
        {
          id: 'ZXxxxxxxxxxxaaaaaaaaaaaaaa',
          username: 'Adam Denisov',
          avatar: '/images/avatars/avatar_7.png',
          active: true,
          lastActivity: moment(),
          messages: [
            {
              id: '334',
              sender: {
                authUser: false,
                username: 'Adam Denisov',
                avatar: '/images/avatars/avatar_7.png',
                lastActivity: moment(),
              },
              content:
                "Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?",
              contentType: 'text',
              createdAt: moment().subtract(10, 'hours')
            },
            {
              id: '33453453',
              sender: {
                authUser: true,
                username: 'Shen Zhi',
                avatar: '/images/avatars/avatar_11.png',
              },
              content:
                'I would need to know more details, but my hourly rate stats at $35/hour. Thanks!',
              contentType: 'text',
              createdAt: moment().subtract(2, 'hours'),
            },
            {
              id: '3345345345',
              sender: {
                authUser: false,
                username: 'Adam Denisov',
                avatar: '/images/avatars/avatar_7.png',
              },
              content:
                "Well it's a really easy one, I'm sure we can make it half of the price.",
              contentType: 'text',
              createdAt: moment().subtract(5, 'minutes'),
            },
            {
              id: '3345345345345',
              sender: {
                authUser: true,
                username: 'Shen Zhi',
                avatar: '/images/avatars/avatar_11.png',
              },
              content:
                "Then why don't you make it if it's that easy? Sorry I'm not interetes, have fantastic day Adam!",
              contentType: 'text',
              createdAt: moment().subtract(3, 'minutes'),
            },
            {
              id: '33453453453453',
              sender: {
                authUser: false,
                username: 'Adam Denisov',
                avatar: '/images/avatars/avatar_7.png',
              },
              content: 'Last offer, $25 per hour',
              contentType: 'text',
              createdAt: moment().subtract(1, 'minute'),
            },
            {
              id: '3345345345345353',
              sender: {
                authUser: false,
                username: 'Adam Denisov',
                avatar: '/images/avatars/avatar_7.png',
              },
              content: '/images/projects/project_1.jpg',
              contentType: 'image',
              createdAt: moment().subtract(1, 'minute'),
            }
          ]
        }
      ]
    );
  }, []);

  let selectedConversation;

  if (match.params.id) {
    selectedConversation = conversations.find(
      c => c.id === match.params.id
    );
  }

  return (
    <PageWrapper>
      <div className="chat-page">
        <div className="chat__room-list">
          <ConversationList conversations={conversations} />
        </div>
        <div className="chat__detail">
          <ConversationDetail conversation={selectedConversation} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chat;