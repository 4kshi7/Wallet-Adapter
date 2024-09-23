import { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnection: FC = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Wallet Connect Button */}
            <WalletMultiButton className="btn btn-primary" />
        </div>
    );
};

export default WalletConnection;
