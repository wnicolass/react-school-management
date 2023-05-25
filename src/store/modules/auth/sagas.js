import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Logged in successfully');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  } catch (err) {
    toast.error('Invalid credentials');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = payload?.auth.token;

  if (!token) {
    return;
  }
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        name,
        password: password || undefined,
      });
      toast.success('Account updated successfully!');
      yield put(actions.registerUpdatedSuccess({ name, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        name,
        password,
      });
      toast.success('Account created successfully!');
      yield put(actions.registerCreatedSuccess({ name, email, password }));
      history.push('/sign-in');
    }
  } catch (err) {
    const { errors = [] } = err.response.data;
    const { status = 0 } = err.response;

    if (status === 401) {
      toast.error('You need to sign in again');
      yield put(actions.loginFailure());
      return history.push('sign-in');
    }

    if (errors.length) {
      errors.forEach((error) => {
        const handledError = error.charAt(0).toUpperCase() + error.slice(1);
        toast.error(handledError);
      });
    } else {
      toast.error('Unknown error');
    }
    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
