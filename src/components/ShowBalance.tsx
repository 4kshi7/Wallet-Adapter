import { FC, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const ShowBalance: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
      }
    };

    getBalance();
  }, [publicKey, connection]);

  return (
    <div className="mt-4">
      {publicKey ? (
        <div className="text-lg">
          <strong>SOL Balance:</strong>{" "}
          {balance !== null ? balance.toFixed(2) : "Loading..."} SOL
        </div>
      ) : (
        <p>Wallet not connected</p>
      )}
    </div>
  );
};

export default ShowBalance;
