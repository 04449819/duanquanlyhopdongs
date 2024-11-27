import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import ToastProvider from "../hooks/useToastProvider";
import LoadingComponent from "../Component/LoadingComponent";
import { useSelector } from "react-redux";

const CapNhapHopDong = () => {
  const { uid } = useParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);

  const hopdong = useSelector((p) => p.hopdong.hopdong);
  useEffect(() => {
    const fetchContractStatus = async () => {
      try {
        console.log("áđasad", hopdong);
        const response = await axios.get(
          `https://localhost:7233/api/Hopdong/${uid}`
        );
        setStatus(response.data.data);
      } catch (error) {
        console.error("Error fetching contract status:", error);
        setStatus("expired");
      } finally {
        setLoading(false);
      }
    };
    fetchContractStatus();
  }, [uid]);

  useEffect(() => {
    if (status === "pending") {
      const timer = setTimeout(() => {
        //handleConfirm();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  // const handleConfirm = async () => {
  //   setLoadingConfirm(true);
  //   try {
  //     await axios.put(
  //       `http://localhost:1510/api/contract/handleSubmitEdit/${uid}`
  //     );
  //     ToastProvider("success", "Contract confirmed successfully!");

  //     setConfirmComplete(true);
  //   } catch (error) {
  //     console.error("Error confirming contract:", error);
  //     ToastProvider("error", "Error confirming contract.");
  //   } finally {
  //     setLoadingConfirm(false);
  //   }
  // };

  if (loading) return <LoadingComponent />;

  return (
    <div className="container">
      <div style={{ width: "10%" }} className="ms-auto">
        <WalletDisconnectButton />
      </div>
      <div className="text-center">
        {status === "pending" ? (
          !confirmComplete ? (
            <>
              <LoadingComponent />
            </>
          ) : (
            <div className="all-center">
              <p style={{ fontWeight: "bold", fontSize: "25px" }}>
                Contract has been updated successfully or has expired.
              </p>
            </div>
          )
        ) : (
          <div className="all-center">
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>
              Contract has been updated successfully or has expired.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapNhapHopDong;
