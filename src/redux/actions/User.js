import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_AVATAR_URL,
    UPDATE_USERUPDATED_TO_IDLE
  } from '../constants/User';

  export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST
  });

  export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users
  });

  export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error
  });

  export const deleteUserRequest = (userId) => ({
    type: DELETE_USER_REQUEST,
    payload: userId,
  });

  export const updateAvatarUrl = (id, avatarUrl) => {
    return {
      type: UPDATE_AVATAR_URL,
      payload: { id, avatarUrl },
    };
  };

  export const updateUserRequest = (userId, userData) => {
    return {
      type: UPDATE_USER_REQUEST,
      payload: {
        userId,
        userData,
      },
    };
};

export const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    payload: user
  });

  export const updateUserFailure = (error) => ({
    type: UPDATE_USER_FAILURE,
    payload: error
  });

  export const setUpdatedUserToIdle = () => ({
    type: UPDATE_USERUPDATED_TO_IDLE
  })