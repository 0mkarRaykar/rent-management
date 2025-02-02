import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

// API endpoint
const API_URL =
  "https://rent-management-pg2q.onrender.com/api/v1/auths/register";

const registerApi = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

function* registerUser({ payload: { user, navigate } }) {
  try {
    const response = yield call(registerApi, user);

    const { user: registeredUser, token } = response.data;

    /// Store user data and tokens in localStorage
    localStorage.setItem("authUser", JSON.stringify(registeredUser));
    localStorage.setItem("accessToken", token);

    yield put(registerUserSuccessful(registerUser));
    toast.success("Registration successful!");
    if (navigate) {
      navigate("/login");
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
