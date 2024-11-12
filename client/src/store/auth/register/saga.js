import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

import axios from "axios";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  try {
    // Use axios to send the register request to your backend
    const response = yield call(
      axios.post,
      "http://localhost:8000/api/auth/register",
      {
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        address: {
          country: user.address.country,
          state: user.address.state,
          city: user.address.city,
          pincode: user.address.pincode,
        },
        role: user.role || 1, // Default role is 1 if not provided
      }
    );

    // Save the user data to local storage or any necessary location
    localStorage.setItem("authUser", JSON.stringify(response.data));

    // Dispatch the success action with the registered user data
    yield put(registerUserSuccessful(response.data));

  } catch (error) {
    // Dispatch the failure action if registration fails
    yield put(
      registerUserFailed(
        error.response ? error.response.data.message : error.message
      )
    );
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
