import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import axios from "axios";
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import io from 'socket.io-client';

import ConversationList from './components/ConversationList';
import ConversationDetail from './components/ConvervationDetail';
import PageWrapper from '../../components/PageWrapper';
import ConversationPlaceholder from './components/ConvervationDetail/components/ConversationPlaceholer';
import "./style.scss";

const Chat = (props) => {
  const { match, history, isLogin, checkAuth, companyId, token, fetchRoomList, userId, username, email, conversations, receiveMessage, fetchUsersStatus, ...rest } = props;
  let socket;

  const [conversationSelected, setConversation] = useState(null);

  useEffect(() => {
    checkAuth();
    if (!isLogin) {
      history.replace('/auth/login');
    }
    if (token) {
      socket = io(`http://localhost:8000/${companyId}`, {
        query: {
          token: token
        }
      });

      socket.emit('login');

      fetchRoomList(socket, userId, username, email);

      socket.on("messageFromServer", (message, roomId, unreadTotal) => {
        const audio = new Audio("/sounds/alert_notify.mp3");
        audio.play();
        receiveMessage(message, roomId, unreadTotal);
      });

      socket.on("userActivityList", ({ userId, isOnline, lastActivity }) => {
        fetchUsersStatus(userId, isOnline, lastActivity);
      });
    }

  }, [isLogin]);

  // useEffect(() => {

  //   setConversations(
  //     [
  //       {
  //         id: 'ZXxxxxxxxxxxaaaaaaaaaaaaaa',
  //         username: 'Adam Denisov',
  //         avatar: '/images/avatars/avatar_7.png',
  //         active: true,
  //         lastActivity: moment(),
  //         messages: [
  //           {
  //             id: '334',
  //             sender: {
  //               authUser: false,
  //               username: 'Adam Denisov',
  //               avatar: '/images/avatars/avatar_7.png',
  //               lastActivity: moment(),
  //             },
  //             content:
  //               "Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?",
  //             contentType: 'text',
  //             createdAt: moment().subtract(10, 'hours')
  //           },
  //           {
  //             id: '33453453',
  //             sender: {
  //               authUser: true,
  //               username: 'Shen Zhi',
  //               avatar: '/images/avatars/avatar_11.png',
  //             },
  //             content:
  //               'I would need to know more details, but my hourly rate stats at $35/hour. Thanks!',
  //             contentType: 'text',
  //             createdAt: moment().subtract(2, 'hours'),
  //           },
  //           {
  //             id: '3345345345',
  //             sender: {
  //               authUser: false,
  //               username: 'Adam Denisov',
  //               avatar: '/images/avatars/avatar_7.png',
  //             },
  //             content:
  //               "Well it's a really easy one, I'm sure we can make it half of the price.",
  //             contentType: 'text',
  //             createdAt: moment().subtract(5, 'minutes'),
  //           },
  //           {
  //             id: '3345345345345',
  //             sender: {
  //               authUser: true,
  //               username: 'Shen Zhi',
  //               avatar: '/images/avatars/avatar_11.png',
  //             },
  //             content:
  //               "Then why don't you make it if it's that easy? Sorry I'm not interetes, have fantastic day Adam!",
  //             contentType: 'text',
  //             createdAt: moment().subtract(3, 'minutes'),
  //           },
  //           {
  //             id: '33453453453453',
  //             sender: {
  //               authUser: false,
  //               username: 'Adam Denisov',
  //               avatar: '/images/avatars/avatar_7.png',
  //             },
  //             content: 'Last offer, $25 per hour',
  //             contentType: 'text',
  //             createdAt: moment().subtract(1, 'minute'),
  //           },
  //           {
  //             id: '3345345345345353',
  //             sender: {
  //               authUser: false,
  //               username: 'Adam Denisov',
  //               avatar: '/images/avatars/avatar_7.png',
  //             },
  //             content: '/images/projects/project_1.jpg',
  //             contentType: 'image',
  //             createdAt: moment().subtract(1, 'minute'),
  //           }
  //         ]
  //       }
  //     ]
  //   );
  // }, []);

  useEffect(() => {
    let selectedConversation;
    if (match.params.id) {
      selectedConversation = conversations.find(
        c => c.id === match.params.id
      );
    }
    setConversation(selectedConversation);
  }, [match.params.id, conversations]);

  return (
    <PageWrapper>
      <div className="chat-page">
        <div className="chat__room-list">
          <ConversationList conversations={conversations} />
        </div>
        <div className="chat__detail">
          {
            get(match, 'params.id', '') !== '' ? (
              <ConversationDetail conversation={conversationSelected} />
            ) :
              (
                <ConversationPlaceholder />
              )
          }
        </div>
      </div>
    </PageWrapper>
  );
};

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
  companyId: state.auth.companyId,
  token: state.auth.token,
  userId: state.auth.userId,
  username: state.auth.username,
  email: state.auth.email,
  conversations: state.chat.conversations
});

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(actions.authCheckState()),
  fetchRoomList: (socket, userId, username, email) => dispatch(actions.chatFetchInit(socket, userId, username, email)),
  receiveMessage: (message, roomId, unreadTotal) => dispatch(actions.chatSetMessageRealTime(message, roomId, false, unreadTotal)),
  fetchUsersStatus: (userId, isOnline) => dispatch(actions.chatSetUsersStatus(userId, isOnline))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat));