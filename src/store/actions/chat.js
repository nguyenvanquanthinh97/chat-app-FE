import { CHAT } from '../actionTypes';

export const chatFetchInit = (socket, userId, username, email) => ({
  type: CHAT.CHAT_FETCH_INIT,
  socket,
  userId,
  username,
  email
});

export const chatFetchRooms = () => ({
  type: CHAT.CHAT_FETCH_ROOMS
});

export const chatSetRooms = (roomList) => ({
  type: CHAT.CHAT_SET_ROOMS,
  roomList: roomList
});

export const chatFetchFail = (error) => ({
  type: CHAT.CHAT_FETCH_FAIL,
  error: error
});

export const chatFetchMessagesStart = (socket, roomId) => ({
  type: CHAT.CHAT_FETCH_MESSAGES,
  socket,
  roomId
});

export const chatSetMessages = (roomId, messages) => ({
  type: CHAT.CHAT_SET_MESSAGES,
  roomId,
  messages
});

export const chatFetchMessagesEnd = (roomId) => ({
  type: CHAT.CHAT_FETCH_MESSAGES_END,
  roomId
});

export const chatSendMessageInit = (socket, message, roomId) => ({
  type: CHAT.CHAT_SEND_MESSAGE_INIT,
  socket,
  message,
  roomId
});

export const chatSetMessageRealTime = (message, roomId, isAuth, unreadTotal = 0) => ({
  type: CHAT.CHAT_SET_MESSAGE_REALTIME,
  message,
  roomId,
  isAuth,
  unread: unreadTotal
});

export const chatSetUsersStatus = (userId, isOnline, lastActivity) => ({
  type: CHAT.CHAT_SET_USERS_STATUS,
  userId,
  active: isOnline,
  lastActivity
})

export const chatSetUnreadMessagesToRead = (roomId) => ({
  type: CHAT.CHAT_SET_UNREAD_MESSAGES_ARE_READ,
  roomId
})

export const chatAuthClose = (socket) => ({
  type: CHAT.CHAT_AUTH_CLOSE,
  socket
})