import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserSuccess,
  updateUserFailure,
} from '../actions/User';
import {
  FETCH_USERS_REQUEST,
  UPDATE_USER_REQUEST,
} from '../constants/User';

const API = 'https://jsonplaceholder.typicode.com/users';

function fetchUsersApi() {
  return fetch(API).then((response) => response.json());
}

function* fetchUsersSaga() {
  try {
    const users = yield call(fetchUsersApi);

    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS_REQUEST, fetchUsersSaga);
}

function updateUserApi(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
    }, 3000);
  });
}

function* updateUserSaga(action) {
  try {
    const updatedUser = yield call(updateUserApi, action.payload.userData);

    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
}

export default function* userSaga() {
  yield all([
    watchFetchUsers(),
    watchUpdateUser()
  ]);
}
