import { FC, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const SignMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();

  const handleSignMessage = useCallback(async () => {
    if (!publicKey || !signMessage) {
      alert("Wallet not connected or signMessage not supported");
      return;
    }

    try {
      const message = new TextEncoder().encode("Hello, Solana!");
      const signature = await signMessage(message);
      alert(
        `Message signed! Signature: ${Buffer.from(signature).toString("hex")}`
      );
    } catch (error) {
      console.error(error);
      alert("Signing failed");
    }
  }, [publicKey, signMessage]);

  return (
    <button onClick={handleSignMessage} className="mt-4 btn btn-primary">
      Sign Message
    </button>
  );
};

export default SignMessage;
