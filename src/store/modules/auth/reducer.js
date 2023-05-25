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
      const newState = structuredClone(initialState);
      newState.isLoading = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
