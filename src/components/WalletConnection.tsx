import { FC, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ShowBalance from "./ShowBalance";
import SendTransaction from "./SendTransaction";
import SignMessage from "./SignMessage";

const WalletConnection: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // Request airdrop function
  const requestAirdrop = useCallback(async () => {
    if (!publicKey) {
      alert("Wallet not connected");
      return;
    }

    try {
      const signature = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      ); // 1 SOL
      await connection.confirmTransaction(signature);
      alert("Airdrop requested successfully");
    } catch (error) {
      console.error(error);
      alert("Airdrop failed");
    }
  }, [publicKey, connection]);

  return (
    <div className="flex flex-col items-center">
      <WalletMultiButton className="btn btn-primary" />
      {publicKey && (
        <button onClick={requestAirdrop} className="mt-4 btn btn-secondary">
          Request Airdrop
        </button>
      )}
      <ShowBalance />
      <SendTransaction />
      <SignMessage />
    </div>
  );
};

export default WalletConnection;
