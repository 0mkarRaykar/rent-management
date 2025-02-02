import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_USERS_REQUEST } from "./actionTypes";
import { fetchUsersSuccess, fetchUsersFailure } from "./actions";

function* fetchUsersSaga() {
  try {
    const token = localStorage.getItem("accessToken"); // Assuming token is stored

    if (!token) {
      yield put(fetchUsersFailure("No authentication token found"));
      return;
    }

    const response = yield call(
      axios.get,
      "https://rent-management-pg2q.onrender.com/api/v1/users/getAllUsers",
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

function* usersSaga() {
  yield all([takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga)]);
}

export default usersSaga;
