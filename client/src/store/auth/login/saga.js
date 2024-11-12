import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify"; // Import toast from react-toastify

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import axios from "axios";

function* loginUser({ payload: { user, history } }) {
  try {
    // Use axios to send the login request to your backend
    const response = yield call(
      axios.post,
      "http://localhost:8000/api/auth/login",
      {
        email: user.email,
        password: user.password,
      }
    );

    // Extract user data from the response
    const userData = response.data;

    // Save the user data to local storage
    localStorage.setItem("authUser", JSON.stringify(userData));

    // Dispatch the success action with the user data
    yield put(loginSuccess(userData));

    // Redirect based on user role
    if (userData.role === 0) {
      history("/admin-dashboard");
    } else if (userData.role === 1) {
      history("/dashboard");
    }
  } catch (error) {
    // Dispatch the API error if the request fails
    yield put(
      apiError(error.response ? error.response.data.message : error.message)
    );
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    // Remove the authUser from local storage
    localStorage.removeItem("authUser");

    // Optionally, make a request to your backend to log out
    yield put(logoutUserSuccess());

    // Redirect to login page after logout
    history("/login");
  } catch (error) {
    yield put(
      apiError(error.response ? error.response.data.message : error.message)
    );
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      if (response) history("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
