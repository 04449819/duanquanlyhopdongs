import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WalletContext from "./WalletContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DanhSachHopDong from "./QuanLyHopDong/DanhSachHopDong";
import ThemHopDong from "./QuanLyHopDong/ThemHopDong";
import ThongTinHopDong from "./QuanLyHopDong/ThongTinHopDong";
import CapNhapHopDong from "./QuanLyHopDong/CapNhapHopDong";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import Xemlichsu from "./QuanLyHopDong/Xemlichsu";
import ThongTinHopDong1 from "./QuanLyHopDong/ThongTinHopDong1";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WalletContext>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/danhsachhopdong" element={<DanhSachHopDong />} />
            <Route path="/themhopdong" element={<ThemHopDong />} />
            <Route path="/thongtinhopdong" element={<ThongTinHopDong />} />
            <Route path="/thongtinhopdong1" element={<ThongTinHopDong1 />} />
            <Route path="/CapNhapHopDong" element={<CapNhapHopDong />} />
            <Route path="/xemlichsu" element={<Xemlichsu />} />
          </Routes>
          <ToastContainer limit={3} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </WalletContext>
);

reportWebVitals();
