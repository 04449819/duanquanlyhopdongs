import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { format, parse } from "date-fns";
import ToastProvider from "../hooks/useToastProvider";
import { useSelector } from "react-redux";

const ThongTinHopDong1 = () => {
  const [text, setText] = useState("");
  const [contract, setContract] = useState(null);
  const [contractName, setContractName] = useState("");
  const { connected } = useWallet();
  const navigate = useNavigate();
  const { id } = useParams();
  const parseDate = (dateStr) => new Date(dateStr);
  const hopdong = useSelector((p) => p.hopdong.hopdong1);
  const hopdong1 = useSelector((p) => p.hopdong.hopdong);

  const fetchContractByID = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Hopdong/haha?id1=${hopdong.id}`
      );
      const contractData = response.data;
      setContract(contractData);
      setText(contractData.noidung);
      setContractName(contractData.hopdongid);
    } catch (error) {
      ToastProvider("error", "Error fetching contract: " + error.message);
    }
  };

  const handleChange = (value) => {
    setText(value);
  };

  const handleNameChange = (e) => {
    setContractName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedContract = {
        hopdongid: contractName || contract.hopdongid,
        noidung: text || contract.noidung,
        ngayThayDoi: new Date().toISOString(),

        hoTenA: contract.hoTenA,
        hoTenB: contract.hoTenB,
        gmaila: contract.gmaila,
        gmailb: contract.gmailb,
        id: contract.id,
      };
      const response1 = await axios.post(
        `https://localhost:7233/api/Mail/send-student-confirmation?id=${updatedContract.id}&hopdongid=${updatedContract.hopdongid}&noidung=${updatedContract.noidung}&email=${updatedContract.gmailb}&ngaythaydoi=${updatedContract.ngayThayDoi}` // Gửi yêu cầu PUT với ID hợp đồng
      );

      console.log(response1.data);
      if (response1.data === 1) {
        ToastProvider("success", "Contract updated successfully.");
        setTimeout(() => {
          navigate("/danhsachhopdong");
        }, 3000);
      } else {
        ToastProvider("error", "Failed to update the contract.");
      }
    } catch (error) {
      ToastProvider("error", "Error updating contract: " + error.message);
    }
  };

  const handleBack = () => {
    navigate("/xemlichsu");
  };

  useEffect(() => {
    if (!connected) {
      navigate("/"); // Điều hướng nếu không có kết nối ví
    } else {
      fetchContractByID(); // Lấy thông tin hợp đồng khi đã kết nối ví
    }
  }, [connected, navigate]);

  return (
    <div className="container">
      <div style={{ width: "10%" }} className="ms-auto">
        <WalletDisconnectButton />
      </div>
      <div className="w-25">
        <Button onClick={handleBack} variant="primary">
          Trở về
        </Button>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {contract && (
            <>
              <div className="mb-4 d-flex">
                <div>
                  <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                    Tên hợp đồng:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="ms-2"
                    style={{ width: "230px" }}
                    value={contractName}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="ms-3">
                  <label style={{ display: "flex" }}>
                    <p style={{ fontWeight: "bold", paddingRight: "6px" }}>
                      Ngày tạo:
                    </p>
                    {format(
                      parseDate(contract.ngayThayDoi),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <ReactQuill
                    className="quill-editor"
                    value={text}
                    onChange={handleChange}
                    placeholder="Nội dung hợp đồng"
                  />
                </div>
                <div>
                  <div className="w-25 ms-auto">
                    <button className="btn btn-primary ms-5" type="submit">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinHopDong1;
