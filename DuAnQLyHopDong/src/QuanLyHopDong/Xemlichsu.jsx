import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, parse } from "date-fns";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { sethopdong, sethopdong1 } from "../Redux/Reducer/ThongTinHopDong";
import axios from "axios";
import LoadingComponent from "../Component/LoadingComponent";
import Fuse from "fuse.js";
import { ShyftSdk, Network } from "@shyft-to/js";
const Xemlichsu = () => {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [contracts1, setContracts1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [sodu, setSoDu] = useState(0);
  const [query, setvalues] = useState("");
  // const [results, setResults] = useState([]);
  const hopdong = useSelector((p) => p.hopdong.hopdong);
  const shyft = new ShyftSdk({
    apiKey: "i0mjsr1g8kFlAvEj",
    network: Network.Devnet,
  });

  useEffect(() => {
    if (!connected) {
      navigate("/");
    } else {
      fetchContracts();
      getsoduvi();
    }
  }, [connected, navigate]);

  const getsoduvi = async () => {
    console.log(publicKey);
    try {
      const balance = await shyft.wallet.getBalance({
        wallet: publicKey,
      });
      setSoDu(balance);
    } catch (error) {}
  };

  const fetchContracts = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Hopdong/getalllsbyid?Hopdongid=${hopdong.hopdongid}`
      );
      setContracts(response.data);
      setContracts1(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickContract = async (contract) => {
    try {
      dispatch(sethopdong1(contract));
      navigate("/thongtinhopdong1");
    } catch (error) {
      console.error("Error navigating to contract details:", error);
    }
  };

  const HandleOnchangeTimKiem = (e) => {
    setvalues(e.target.value);
    if (e.target.value.trim() !== "") {
      let sp = contracts1.filter((p) => String(p.id) === e.target.value.trim());
      console.log(sp);
      setContracts(sp);
    } else {
      fetchContracts();
    }
  };

  const parseDate = (dateStr) => new Date(dateStr);

  const groupByDate = (contracts = []) => {
    const grouped = contracts.reduce((acc, contract) => {
      const date = parseDate(contract.ngayThayDoi); // Chuyển đổi ngày từ chuỗi sang Date

      const dateKey = format(date, "dd/MM/yyyy"); // Format ngày để làm khóa nhóm

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(contract);
      return acc;
    }, {});

    // Sắp xếp theo ngày từ mới đến cũ
    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      const dateObjA = parse(dateA, "dd/MM/yyyy", new Date()); // Parse dateA
      const dateObjB = parse(dateB, "dd/MM/yyyy", new Date()); // Parse dateB
      return dateObjB - dateObjA; // Sắp xếp từ mới đến cũ
    });
  };

  const groupedContracts = groupByDate(contracts);

  const vetrangchu = async () => {
    navigate("/danhsachhopdong");
  };

  return (
    <>
      <div className="mt-4 ms-5">Số dư ví hiện tại: {sodu}</div>
      <div
        style={{
          width: "10%",
          top: "20px",
          right: "20px",
          position: "relative",
        }}
        className="ms-auto"
      >
        <WalletDisconnectButton />
      </div>
      <h3
        className="text-center mb-5"
        style={{ fontWeight: "bold", fontSize: "30px" }}
      >
        LỊCH SỬ THAY ĐỔI CUẢ HỢP ĐỒNG({hopdong.hopdongid})
      </h3>
      <div className="w-75 mx-auto">
        <div>
          <Button onClick={vetrangchu} variant="primary">
            Trở về
          </Button>
        </div>
        <hr />
        {groupedContracts.map(([date, contracts]) => (
          <div key={date}>
            <p style={{ opacity: "0.6" }}>Ngày: {date}</p>
            <ul>
              {contracts.map((contract, index) => (
                <div key={contract.id}>
                  <li
                    className="listContract"
                    style={{ cursor: "pointer" }}
                    key={contract.id}
                    onClick={() => handleClickContract(contract)}
                  >
                    <strong>
                      {contract.hopdongid} - {contract.id}
                    </strong>
                    <div className="d-flex">
                      <p style={{ marginRight: "8px", fontWeight: "bold" }}>
                        Ngày tạo:
                      </p>
                      {format(
                        parseDate(contract.ngayThayDoi),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </div>
                  </li>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Xemlichsu;
