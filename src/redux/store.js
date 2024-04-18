import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import hobbyReducer from "./hobbySlice";
import authReducer from './authSlice'
import projectReducer from "./projectSlice";


  
const rootReducer=combineReducers({
      hobby:hobbyReducer,
      auth:authReducer,
      project:projectReducer
    })

const persistConfig = {
        key: 'root',
        storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export default store
export const persistor = persistStore(store);


