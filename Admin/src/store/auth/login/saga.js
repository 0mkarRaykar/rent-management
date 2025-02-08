import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import axios from "axios";

// Import action types and actions
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { loginSuccess, apiError, logoutUserSuccess } from "./actions";

// Function to handle the login API call
const loginApi = async (userData) => {
  const response = await axios.post(
    "https://rent-management-pg2q.onrender.com/api/v1/auths/login",
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(loginApi, user);

    const { user: loggedInUser, accessToken, refreshToken } = response.data;

    if (!loggedInUser.isActive) {
      toast.error("Account is deactivated by system.");
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(loggedInUser));
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    yield put(loginSuccess(loggedInUser));
    toast.success("Login successful!");

    if (loggedInUser.role === 0) {
      history("/admin-dashboard");
    } else if (loggedInUser.role === 1) {
      history("/dashboard");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed.";
    yield put(apiError(errorMessage));
    toast.error(errorMessage);
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    // Clear user data from localStorage
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Dispatch logout success action
    yield put(logoutUserSuccess());

    // Redirect to login page
    history("/login");

    toast.success("Logged out successfully!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Logout failed.";
    yield put(apiError(errorMessage));
    toast.error(errorMessage);
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
