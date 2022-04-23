import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'simple-scrapper',
  storage,
};

const store = configureStore({
  reducer: {
    products: persistReducer(persistConfig, productsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const storePersistor = persistStore(store);

export { store, storePersistor };
