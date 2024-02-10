// redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './user/user.slice';
import { searhSlice } from './search/search.slice';

const persistConfig = {
  key: 'web-catalog',
  storage,
  whitelist: ['user'], // Укажите здесь те ключи, которые вы хотите сохранять в localStorage
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  search: searhSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type TypeRootSate = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
