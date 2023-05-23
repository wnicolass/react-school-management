import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'school-management',
      storage,
      whitelist: ['example'],
    },
    reducers
  );

  return persistedReducers;
};
