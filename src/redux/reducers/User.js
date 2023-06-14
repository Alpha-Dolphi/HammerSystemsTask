import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_REQUEST,
    UPDATE_AVATAR_URL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USERUPDATED_TO_IDLE,
  } from '../constants/User';
  import { LoadingStatuses } from '../../constants/loadingStatuses';

  const initialState = {
    users: [],
    loading: false,
    error: null,
    updatedUser: LoadingStatuses.idle,
  };

  const User = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
          error: null
        };
      case FETCH_USERS_FAILURE:
        console.error('Fetch users failed: ', action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case DELETE_USER_REQUEST:
        return {
            ...state,
            loading: false,
            error: null,
            users: state.users.filter((user) => user.id !== action.payload),
          };
      case UPDATE_AVATAR_URL:
          const { id, avatarUrl } = action.payload;
          return {
            ...state,
            users: state.users.map((user) => user.id === id
            ? {
                ...user,
                avatarUrl: avatarUrl,
            }
            : user)
          };
      case UPDATE_USER_REQUEST:
            return {
              ...state,
              loading: true,
              updatedUser: LoadingStatuses.inProgress,
              error: null,
            };
      case UPDATE_USER_SUCCESS:
            const updatedUser = action.payload;
            return {
              ...state,
              loading: false,
              updatedUser: LoadingStatuses.success,
              users: state.users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              ),
              error: null,
            };
      case UPDATE_USER_FAILURE:
            console.error('Update user failed: ', action.payload);
            return {
              ...state,
              loading: false,
              updatedUser: LoadingStatuses.failed,
              error: action.payload,
            };
      case UPDATE_USERUPDATED_TO_IDLE:
            return {
                ...state,
                updatedUser: LoadingStatuses.idle,
            }
      default:
        return state;
    }
  };

  export default User;