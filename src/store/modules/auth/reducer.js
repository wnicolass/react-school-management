import * as types from '../types';
import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: {},
  isLoading: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = structuredClone(state);
      const { payload } = action;
      newState.isLoggedIn = true;
      newState.token = payload.token;
      newState.user = payload.user;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = structuredClone(initialState);
      return newState;
    }

    case types.LOGIN_REQUEST: {
      delete axios.defaults.headers.Authorization;
      const newState = structuredClone(state);
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_UPDATED_SUCCESS: {
      const newState = structuredClone(state);
      newState.user.name = action.payload.name;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_CREATED_SUCCESS: {
      const newState = structuredClone(state);
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = structuredClone(state);
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = structuredClone(state);
      newState.isLoading = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
