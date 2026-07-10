import { tasksApi } from '@/services/tasksApi';
import authReducer from '../features/auth/authSlice';
import { configureStore,combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore,FLUSH, REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth'], 
  blacklist: ['tasksAp.reducerPath'],

};

const rootReducer = combineReducers({
  auth: authReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    .concat(tasksApi.middleware),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;