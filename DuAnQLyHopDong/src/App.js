import logo from "./logo.svg";
import "./App.css";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import "bootstrap/dist/css/bootstrap.min.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "react-bootstrap";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const { connected } = useWallet();
  const navigate = useNavigate();
  useEffect(() => {
    if (connected) {
      navigate("/danhsachhopdong");
    }
  }, [connected]);
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{ border: "1px solid black" }}
          className="khungdangnhap pb-5 mx-auto"
        >
          <img
            style={{ width: "100px", marginTop: "0px" }}
            src={logo}
            className="App-logo mt-3 mb-4"
            alt="logo"
          />
          <h3 className="mb-5">Kết nối ví ngay</h3>
          <WalletMultiButton className="mt-5" />
          <div hidden={!connected ? true : false}>
            <WalletDisconnectButton />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
