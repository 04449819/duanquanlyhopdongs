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

const ThongTinHopDong = () => {
  const [text, setText] = useState("");
  const [contract, setContract] = useState(null);
  const [contractName, setContractName] = useState("");
  const { connected } = useWallet();
  const navigate = useNavigate();
  const { id } = useParams();
  const parseDate = (dateStr) => new Date(dateStr);
  const hopdong = useSelector((p) => p.hopdong.hopdong);

  const fetchContractByID = async () => {
    try {
      const response = await axios.get(`https://localhost:7233/api/Hopdong/${hopdong.id}`);
      const contractData = response.data;
      setContract(contractData);
      setText(contractData.noidung);  // Set text from the contract's content
      setContractName(contractData.hopdongid);  // Set contract name
    } catch (error) {
      ToastProvider("error", "Error fetching contract: " + error.message);
    }
  };
  

  const validateForm = () => {
    let valid = true;
    const newErrors = {};  
  
    // Check if contract content (text) is valid
    if (!text || text.trim() === "") {
      newErrors.text = "Nội dung hợp đồng là bắt buộc."; // Error message for empty contract content
      valid = false;
    }
  
    // Check if contract name is valid
    if (!contractName || contractName.trim() === "") {
      newErrors.name = "Tên hợp đồng là bắt buộc."; // Error message for empty contract name
      valid = false;
    }
  
    return { valid, errors: newErrors };
  };
  
  
  const handleChange = (value) => {
    setText(value);
  };

  const handleNameChange = (e) => {
    setContractName(e.target.value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = validateForm();
  if (!valid) {
    // Display the error messages (can display in the UI)
    Object.values(errors).forEach((error) => {
      ToastProvider("error", error);
    });
    return;
  }

  // Debugging: Log the contract data
  console.log("Contract Name:", contractName);
  console.log("Contract Content:", text);

    try {
      // Tạo dữ liệu hợp đồng đã cập nhật
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

      // Gửi yêu cầu POST để thông báo qua email
      const response1 = await axios.post(
        `https://localhost:7233/api/Mail/send-student-confirmation?id=${updatedContract.id}&hopdongid=${updatedContract.hopdongid}&noidung=${updatedContract.noidung}&email=${updatedContract.gmailb}&ngaythaydoi=${updatedContract.ngayThayDoi}`
      );

      console.log("Response from email send:", response1.data);

      // Kiểm tra phản hồi từ API gửi email
      if (response1.data === 1) {
        ToastProvider("success", "Contract updated successfully.");

        // Tiến hành gửi yêu cầu PUT để cập nhật hợp đồng vào cơ sở dữ liệu
        const response2 = await axios.put(
          `https://localhost:7233/api/Hopdong/${updatedContract.id}`, // URL với ID hợp đồng
          updatedContract // Dữ liệu hợp đồng đã được cập nhật
        );

        console.log("Response from contract update:", response2.data);

        if (response2.status === 200) {
          ToastProvider("success", "Contract successfully updated in database.");
          setTimeout(() => {
            navigate("/danhsachhopdong"); // Điều hướng về danh sách hợp đồng
          }, 3000);
        } else {
          ToastProvider("error", "Failed to update the contract in the database.");
        }
      } else {
        ToastProvider("error", "Failed to update the contract.");
      }
    } catch (error) {
      ToastProvider("error", "Error updating contract: " + error.message);
    }
  };
  
  


  const handleBack = () => {
    navigate("/danhsachhopdong");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7233/api/Hopdong/${contract.id}`
      );

      if (response.data === 1) {
        ToastProvider("success", "Contract deleted successfully.");
        setTimeout(() => {
          navigate("/danhsachhopdong"); // Điều hướng đến danh sách hợp đồng sau khi xóa
        }, 3000);
      } else {
        ToastProvider("error", "Failed to delete the contract.");
      }
    } catch (error) {
      ToastProvider("error", "Error deleting contract: " + error.message);
    }
  };

  const handleDelete1 = async () => {
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
      <div className="w-100 d-lex">
        <div className="w-25">
          <Button onClick={handleBack} variant="primary">
            Trở về
          </Button>
        </div>
        <div className="w-25 ms-auto">
          <Button variant="primary" onClick={handleDelete1}>
            Xem lịch sửa thay đổi
          </Button>
        </div>
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
                  <div className="w-100 d-flex">
                    <div className="w-25 ">
                      <button
                        className="btn btn-danger ms-5"
                        type="button"
                        onClick={handleDelete}
                      >
                        Xóa hợp đồng
                      </button>
                    </div>
                    <div className="w-25 ms-auto">
                      <button className="btn btn-primary ms-5" type="submit">
                        Cập nhật
                      </button>
                    </div>
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

export default ThongTinHopDong;
