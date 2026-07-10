import { tasksApi } from '@/services/tasksApi';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import { configureStore,combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore,FLUSH, REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth', 'ui'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
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