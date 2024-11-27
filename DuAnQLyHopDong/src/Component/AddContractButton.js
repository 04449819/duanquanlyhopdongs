import React, { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";
import { saveContract, sendConfirmationEmail } from "../until/api";

// Polyfill for Buffer
import { Buffer } from "buffer";
window.Buffer = Buffer;

const AddContractButton = ({ contract }) => {
  const { publicKey, sendTransaction } = useWallet();

  const handlePayment = useCallback(async () => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const network = "https://api.mainnet-beta.solana.com";
    // const network = "https://api.mainnet-beta.solana.com";
    const connection = new Connection(network);

    // Tạo một tài khoản ngẫu nhiên mới
    const newAccount = Keypair.generate();
    const toPublicKey = newAccount.publicKey;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPublicKey, // Sử dụng public key của tài khoản ngẫu nhiên
        lamports: 1000, // Số lượng lamports để gửi (1 lamport = 0.000000001 SOL)
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");
      console.log("Payment successful with signature:", signature);

      // Lưu thông tin hợp đồng sau khi thanh toán thành công
      const result = await saveContract(contract);
      console.log("Contract saved:", result);
      alert("Payment successful with signature");

      // Gửi email xác nhận đến bên A và bên B
      await sendConfirmationEmail(result.id, contract.partyA);
      await sendConfirmationEmail(result.id, contract.partyB);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }, [publicKey, sendTransaction, contract]);

  return (
    <button onClick={handlePayment} disabled={!publicKey}>
      Pay and Add Contract
    </button>
  );
};

export default AddContractButton;
