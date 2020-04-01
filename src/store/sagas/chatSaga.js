import { takeLatest, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { get } from 'lodash';
import moment from 'moment-timezone';

import { CHAT } from '../actionTypes';
import * as actions from '../actions';

function* handleJoinCompanyChatEvent(socket, userId, username) {
  return eventChannel((emit) => {
    const handleRoomsData = (roomList, userActivityList) => {
      const rooms = roomList.map(room => {
        const id = get(room, '_id');
        let otherUser = Array.from(room.clients).find(client => client.userId !== userId);
        if (!otherUser) {
          otherUser = {
            userId,
            username
          };
        }
        const otherUserStatus = userActivityList.find(userActivity => userActivity.userId === otherUser.userId);
        const active = get(otherUserStatus, 'isOnline', false);
        const lastActivity = active ? moment() : moment(get(otherUserStatus, 'lastActive'));
        const messages = get(room, 'messages', []).map(message => {
          const isAuth = get(message, 'senderId') === userId;
          const usernameOfSender = isAuth ? username : get(otherUser, 'username', '');
          return {
            sender: {
              authUser: isAuth,
              username: usernameOfSender,
              avatar: '',
              content: get(message, 'content'),
              contentType: get(message, 'contentType'),
              createdAt: moment(get(message, 'createdAt'))
            }
          };
        });
        return {
          id,
          otherUserId: get(otherUser, 'userId'),
          username: get(otherUser, 'username'),
          avatar: get(room, 'avatar', ''),
          active,
          lastActivity,
          messages
        };
      });
      emit(rooms);
    };
    socket.emit("joinCompanyChat", handleRoomsData);
    return () => { };
  });
}

function* fetchRoomListSaga(action) {
  yield put(actions.chatFetchRooms());
  const socket = get(action, 'socket');
  const userId = get(action, 'userId');
  const username = get(action, 'username');
  const roomEventChannel = yield call(handleJoinCompanyChatEvent, socket, userId, username);

  socket.on('error', error => {
    socket.disconnect();
  });

  while (true) {
    const rooms = yield take(roomEventChannel);
    yield put(actions.chatSetRooms(rooms));
    return;
  }

}

function* sendMessageSaga({ socket, message, roomId }) {
  socket.emit("messageFromClient", message, roomId);
  yield put(actions.chatSetMessageRealTime(message, roomId, true));
}

function* closeSocketSaga({ socket }) {
  socket.close();
}

function* chatSaga() {
  yield takeLatest(CHAT.CHAT_FETCH_INIT, fetchRoomListSaga);
  yield takeLatest(CHAT.CHAT_SEND_MESSAGE_INIT, sendMessageSaga);
  yield takeLatest(CHAT.CHAT_AUTH_CLOSE, closeSocketSaga);
}

export default chatSaga;