import { CHAT } from '../actionTypes';
import { get, set, cloneDeep } from 'lodash';
import moment from 'moment-timezone';

const initialState = {
  loading: false,
  conversations: [],
  error: null,
  socket: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT.CHAT_FETCH_INIT: {
      return {
        ...state,
        socket: action.socket
      };
    }
    case CHAT.CHAT_FETCH_ROOMS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    };
    case CHAT.CHAT_SET_ROOMS: {
      return {
        ...state,
        conversations: action.roomList,
        loading: false
      };
    };
    case CHAT.CHAT_FETCH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case CHAT.CHAT_FETCH_MESSAGES_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHAT.CHAT_SET_MESSAGES: {
      return {
        ...state,
        loading: false
      };
    }
    case CHAT.CHAT_FETCH_MESSAGES_END: {
      const updatedIdx = state.conversations.findIndex(conversation => get(conversation, 'roomId') === get(action, 'roomId'));
      set(state.conversations[updatedIdx], 'isMessagesEnd', true);
      return {
        ...state,
        loading: false
      };
    }
    case CHAT.CHAT_SET_MESSAGE_REALTIME: {
      const updatedConversation = [...state.conversations];
      const roomId = action.roomId;
      const message = action.message;
      const isAuth = action.isAuth;
      const room = updatedConversation.find(item => item.id === roomId);
      const formatMessage = {
        sender: {
          authUser: isAuth,
          username: get(message, 'username'),
          avatar: get(message, 'avatar'),
          content: get(message, 'content'),
          contentType: get(message, 'contentType'),
          createdAt: moment(get(message, 'createdAt'))
        },
      };
      room.messages.push(formatMessage);
      return {
        ...state,
        conversations: updatedConversation
      };
    }
    case CHAT.CHAT_SET_USERS_STATUS: {
      const { userId, active } = action;
      const updatedConversations = [...state.conversations];
      const conversation = updatedConversations.find(conversation => conversation.otherUserId === userId);
      set(conversation, 'active', active);
      return {
        ...state,
        conversations: updatedConversations
      };
    }
    case CHAT.CHAT_AUTH_CLOSE: {
      return {
        ...state,
        conversations: [],
        socket: null
      }
    }
    default:
      return state;
  }
};

export default reducer;