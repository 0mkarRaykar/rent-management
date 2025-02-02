import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./actionTypes";

const initialState = {
  loading: false,
  users: [],
  error: null,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Users
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Add User
    case ADD_USER_REQUEST:
      return { ...state, addLoading: true, error: null };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        addLoading: false,
        users: [...state.users, action.payload],
      };
    case ADD_USER_FAILURE:
      return { ...state, addLoading: false, error: action.payload };

    // Update User
    case UPDATE_USER_REQUEST:
      return { ...state, updateLoading: true, error: null };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case UPDATE_USER_FAILURE:
      return { ...state, updateLoading: false, error: action.payload };

    // Delete User
    case DELETE_USER_REQUEST:
      return { ...state, deleteLoading: true, error: null };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case DELETE_USER_FAILURE:
      return { ...state, deleteLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
