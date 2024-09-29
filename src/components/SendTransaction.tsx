import { FC, useState } from "react";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const SendTransaction: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSendTransaction = async () => {
    if (!publicKey || !recipient || !amount) {
      alert("Please provide recipient and amount.");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      alert("Transaction successful");
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input mt-2"
      />
      <button onClick={handleSendTransaction} className="mt-4 btn btn-primary">
        Send Transaction
      </button>
    </div>
  );
};

export default SendTransaction;
