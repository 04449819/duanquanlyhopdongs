import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ThongTinHopDong from "../Reducer/ThongTinHopDong";

const persistConfig = {
  key: "root",
  storage,
};

// Bao bọc reducer với persistReducer
const persistedReducer = persistReducer(persistConfig, ThongTinHopDong);

const store = configureStore({
  reducer: {
    hopdong: persistedReducer, // Sử dụng persistedReducer ở đây
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
