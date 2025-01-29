import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

// API endpoint
const API_URL =
  "https://rent-management-pg2q.onrender.com/api/v1/auths/register";

// Worker Saga: Handles user registration
// Worker Saga: Handles user registration
function* registerUser({ payload: { user, navigate } }) {
  try {
    const response = yield call(axios.post, API_URL, user);

    // Store authentication tokens
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    yield put(registerUserSuccessful(response.data));

    if (navigate) {
      navigate("/dashboard");
    }
  } catch (error) {
    yield put(
      registerUserFailed(error.response?.data?.message || error.message)
    );
  }
}

// Watcher Saga: Watches for REGISTER_USER action
export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

// Combine all account-related sagas
function* accountSaga() {
  yield takeEvery(REGISTER_USER, registerUser);
}

export default accountSaga;
