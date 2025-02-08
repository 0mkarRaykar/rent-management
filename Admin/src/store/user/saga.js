import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USER_BY_ID_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
} from "./actionTypes";
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserSuccess,
  addUserFailure,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
} from "./actions";

const API_BASE_URL = "https://rent-management-pg2q.onrender.com/api/v1";

function* addUserSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/users/create`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(addUserFailure(error.message));
  }
}

function* fetchUsersSaga() {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      yield put(fetchUsersFailure("No authentication token found"));
      return;
    }

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/users/getAllUsers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(fetchUsersSuccess(response.data.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to fetch users";

    // Handle 401 specifically
    if (error.response?.status === 401) {
      // Clear invalid token and redirect
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Redirect to login
    }

    yield put(fetchUsersFailure(errorMessage));
  }
}

function* fetchUserByIdSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/users/${action.payload._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(fetchUserByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchUserByIdFailure(error.message));
  }
}

function* updateUserSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      yield put(fetchUsersFailure("No authentication token found"));
      return;
    }
    const response = yield call(
      axios.patch,
      `${API_BASE_URL}/users/${action.payload._id}`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

function* deleteUserSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      yield put(fetchUsersFailure("No authentication token found"));
      return;
    }
    yield call(axios.delete, `${API_BASE_URL}/users/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

function* usersSaga() {
  yield all([
    takeLatest(ADD_USER_REQUEST, addUserSaga),
    takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga),
    takeLatest(FETCH_USER_BY_ID_REQUEST, fetchUserByIdSaga),
    takeLatest(UPDATE_USER_REQUEST, updateUserSaga),
    takeLatest(DELETE_USER_REQUEST, deleteUserSaga),
  ]);
}

export default usersSaga;
