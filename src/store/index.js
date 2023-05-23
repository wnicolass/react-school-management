import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/root.reducer';
import rootSaga from './modules/root.saga';
import persistedReducers from './modules/redux.persist';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: persistedReducers(rootReducer),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
