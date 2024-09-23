import { FC, useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css'; // Import wallet styles
import WalletConnection from './components/WalletConnection'; // Import WalletConnection component

const App: FC = () => {
    // Use devnet, can be changed to 'mainnet-beta' or 'testnet'
    const network = clusterApiUrl('devnet'); 

    // Setup wallets like Phantom and Solflare
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={network}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="App bg-gray-100 min-h-screen flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold mb-4">Solana Wallet Adapter</h1>
                        {/* Wallet Connection Button */}
                        <WalletConnection />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
