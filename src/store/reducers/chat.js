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
      const unreadRooms = action.roomList.filter(room => room.unread > 0);
      const readedRooms = action.roomList.filter(room => room.unread === 0);
      const updatedRooms = unreadRooms.concat(readedRooms);
      return {
        ...state,
        conversations: updatedRooms,
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
    case CHAT.CHAT_SEND_MESSAGE_INIT: {
      const type = get(action.message, 'contentType');
      const fileTypes = ['image', 'file'];
      if(fileTypes.includes(type)) {
        const updatedConversation = cloneDeep(state.conversations);
        const roomId = action.roomId;
        const room = updatedConversation.find(item => item.id === roomId);
        set(room, 'loading', true);
        return {
          ...state,
          conversations: updatedConversation
        }
      }
    }
    case CHAT.CHAT_SET_MESSAGE_REALTIME: {
      const fileTypes = ['image', 'file'];
      const updatedConversation = cloneDeep(state.conversations);
      const roomId = action.roomId;
      const message = action.message;
      const isAuth = action.isAuth;
      if (fileTypes.includes(get(message, 'contentType')) && get(message, 'content', '') === '') {
        return {
          ...state
        };
      }

      const room = updatedConversation.find(item => item.id === roomId);
      room.unread = action.unread;
      if(fileTypes.includes(get(message, 'contentType'))) {
        set(room, 'loading', false);
      }

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
      const { userId, active, lastActivity } = action;
      const updatedConversations = [...state.conversations];
      const conversation = updatedConversations.find(conversation => conversation.otherUserId === userId);
      set(conversation, 'active', active);
      set(conversation, 'lastActivity', lastActivity);
      return {
        ...state,
        conversations: updatedConversations
      };
    }
    case CHAT.CHAT_SET_UNREAD_MESSAGES_ARE_READ: {
      const conversations = cloneDeep(state.conversations);
      const conversation = conversations.find(room => room.id === action.roomId);
      set(conversation, 'unread', 0);
      return {
        ...state,
        conversations: conversations
      };
    }
    case CHAT.CHAT_AUTH_CLOSE: {
      return {
        ...state,
        conversations: [],
        socket: null
      };
    }
    default:
      return state;
  }
};

export default reducer;