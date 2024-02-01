import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import partsSlice from "./partsSlice";
import cartsPartSlice from "./cartPartSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth",'parts'],
};
const reducer = combineReducers({
  auth: authSlice,
  parts: partsSlice,
  carts:cartsPartSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;