import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import axios from "axios";
import ToastProvider from "../hooks/useToastProvider";

const ThemHopDong = () => {
  const { connected, publicKey, signTransaction } = useWallet();
  const navigate = useNavigate();
  const currentDate = new Date();
  const [isContractIdVisible, setIsContractIdVisible] = useState(false);
  const [contract, setContract] = useState({
    name: "",
    id: "",
    dateCreated: currentDate,
    message: "",
    partyA: { name: "", email: "" },
    partyB: { name: "", email: "" },
  });
  const [errors, setErrors] = useState({
    name: "",
    id: "",
    message: "",
    partyAName: "",
    partyAEmail: "",
    partyBName: "",
    partyBEmail: "",
  });

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  const handleChange = (value) => {
    setContract((prevContract) => ({
      ...prevContract,
      message: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");
    if (subField) {
      setContract((prevContract) => ({
        ...prevContract,
        [field]: { ...prevContract[field], [subField]: value },
      }));
    } else {
      setContract((prevContract) => ({
        ...prevContract,
        [name]: value,
      }));
    }
  };

  const handleBack = () => {
    navigate("/danhsachhopdong");
  };
  const checkContractNameExists = async (contractName) => {
    try {
      // Gọi API để kiểm tra mã hợp đồng
      const response = await axios.get(`https://localhost:7233/api/Hopdong/check-id?id=${contractName}`);
      
      console.log("API response for contract name check:", response.data);  // Kiểm tra phản hồi từ API
      
      // Kiểm tra nếu API trả về exists: true thì có nghĩa là mã hợp đồng đã tồn tại
      return response.data.exists;  // Nếu exists: true, trả về true (mã hợp đồng đã tồn tại), ngược lại trả về false
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã hợp đồng:", error);
      return false;  // Nếu có lỗi trong việc gọi API, coi như mã hợp đồng chưa tồn tại
    }
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    if (!contract.message) {
      newErrors.message = "Nội dung hợp đồng là bắt buộc.";
      valid = false;
    }
    if (!contract.partyA.name) {
      newErrors.partyAName = "Tên bên A là bắt buộc.";
      valid = false;
    }
    if (!contract.partyA.email) {
      newErrors.partyAEmail = "Email bên A là bắt buộc.";
      valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contract.partyA.email)) {
      newErrors.partyAEmail = "Email bên A không hợp lệ.";
      valid = false;
    }
    if (!contract.partyB.name) {
      newErrors.partyBName = "Tên bên B là bắt buộc.";
      valid = false;
    }
    if (!contract.partyB.email) {
      newErrors.partyBEmail = "Email bên B là bắt buộc.";
      valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contract.partyB.email)) {
      newErrors.partyBEmail = "Email bên B không hợp lệ.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idExists = await checkContractNameExists(contract.name);
    if (idExists) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Mã hợp đồng đã tồn tại trong cơ sở dữ liệu."
      }));
      return; 
    }

    if (!publicKey) {
      console.warn("Public key is missing. Please connect your wallet.");
      return;
    }
    const data = {
      hopdongid: contract?.name,
      id: contract?.id,
      dateCreated: new Date().toISOString(),
      noidung: contract?.message,
      addressCreator: publicKey?.toBase58(),
      gmaila: contract?.partyA?.email,
      hoTenA: contract?.partyA?.name,
      gmailb: contract?.partyB?.email,
      hoTenB: contract?.partyB?.name,
    };
    console.log(data.noidung);
    console.log(
      `https://localhost:7233/api/Mail/send-student-confirmation1?id=1&hopdongid=${data.hopdongid}&noidung=${data.noidung}&bena=${data.hoTenA}&gmaila=${data.gmaila}&benb=${data.hoTenA}&email=${data.gmailb}&ngaythaydoi=${data.dateCreated}`
    );
    const hopdongResponse = await axios.post(
      `https://localhost:7233/api/Mail/send-student-confirmation1?id=1&hopdongid=${data.hopdongid}&noidung=${data.noidung}&bena=${data.hoTenA}&gmaila=${data.gmaila}&benb=${data.hoTenB}&email=${data.gmailb}&ngaythaydoi=${data.dateCreated}`
    );
    console.log("Hopdong API response:", hopdongResponse.data);
    if (hopdongResponse.data === 1) {
      ToastProvider("success", "Contract add successfully.");
    }
    setTimeout(() => {
      navigate("/danhsachhopdong");
    }, 2000);
  };

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
          <div className="mb-4 d-flex">
            <div>
              <div>
                <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                  Mã hợp đồng:
                </label>
                <input
                  type="text"
                  name="name"
                  className="ms-2"
                  style={{ width: "230px" }}
                  value={contract.name}
                  onChange={handleInputChange}
                />
                  {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
              </div>
              <div className="mt-4">
                
                {isContractIdVisible && (
                  <input
                    className="ms-2"
                    type="text"
                    name="id"
                    style={{ width: "230px" }}
                    value={contract.id}
                    onChange={handleInputChange}
                  />
                )}
                {isContractIdVisible && errors.id && (
                  <div style={{ color: "red" }}>{errors.id}</div>
                )}
              </div>
            </div>
            <div className="ms-3">
              <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                Ngày tạo: {format(currentDate, "dd/MM/yyyy HH:mm:ss")}
              </label>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <ReactQuill
                className="quill-editor"
                value={contract.message}
                onChange={handleChange}
                placeholder="Nội dung hợp đồng"
              />
            </div>
            <div>
              <div className="row">
                <div className="col-6">
                  <div>
                    <h3>Bên A</h3>
                    <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                      Tên:
                    </label>
                    <input
                      className="ms-5"
                      style={{ width: "230px" }}
                      type="text"
                      name="partyA.name"
                      value={contract.partyA.name}
                      onChange={handleInputChange}
                    />
                     {errors.partyAName && <div style={{ color: "red" }}>{errors.partyAName}</div>}
                  </div>
                  <div className="mt-4">
                    <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                      Email:
                    </label>
                    <input
                      style={{ marginLeft: "34px", width: "230px" }}
                      type="email"
                      name="partyA.email"
                      value={contract.partyA.email}
                      onChange={handleInputChange}
                    />
                     {errors.partyAEmail && <div style={{ color: "red" }}>{errors.partyAEmail}</div>}
                  </div>
                </div>
                <div className="col-6">
                  <div className="ms-5">
                    <h3>Bên B</h3>
                    <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                      Tên:
                    </label>
                    <input
                      className="ms-5"
                      style={{ width: "230px" }}
                      type="text"
                      name="partyB.name"
                      value={contract.partyB.name}
                      onChange={handleInputChange}
                    />
                      {errors.partyBName && <div style={{ color: "red" }}>{errors.partyBName}</div>}
                  </div>
                  <div className="mt-4 ms-5">
                    <label style={{ fontWeight: "bold", paddingRight: "6px" }}>
                      Email:
                    </label>
                    <input
                      style={{ marginLeft: "34px", width: "230px" }}
                      type="email"
                      name="partyB.email"
                      value={contract.partyB.email}
                      onChange={handleInputChange}
                    />
                     {errors.partyBEmail && <div style={{ color: "red" }}>{errors.partyBEmail}</div>}
                  </div>
                </div>
              </div>
              <div style={{ width: "50px" }} className=" ms-auto mt-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemHopDong;
