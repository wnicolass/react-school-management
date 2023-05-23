import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

function request() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

function* exampleRequest() {
  try {
    yield call(request);
    yield put(actions.buttonClickSuccess());
  } catch (err) {
    toast.error('Something went wrong');
    yield put(actions.buttonClickFailure());
  }
}

export default all([takeLatest(types.BUTTON_CLICKED_REQUEST, exampleRequest)]);
