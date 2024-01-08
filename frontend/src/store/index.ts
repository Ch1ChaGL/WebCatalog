import { combineReducers, configureStore } from '@reduxjs/toolkit';


// import storage from 'redux-persist/lib/storage';
import { userSlice } from './user/user.slice';

// const persistConfig = {
//   key: 'web-catalog',
//   storage,
//   whitelist: [],
// };

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
});

// export const persistor = persistStore(store);

export type TypeRootSate = ReturnType<typeof rootReducer>;
