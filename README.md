# Solana Wallet Adapter Application

## Overview

This Solana Wallet Adapter application is a React-based TypeScript project that integrates various wallet functionalities using Solana's wallet adapter libraries. It enables users to:

1. **Connect to their Solana wallet**
2. **Request SOL Airdrops** from the devnet faucet
3. **Show their SOL balances**
4. **Send transactions** to other wallet addresses
5. **Sign a message** for ownership verification

This project demonstrates how to interact with the Solana blockchain using the `@solana/web3.js` and `@solana/wallet-adapter-react` libraries, making it a great starting point for building Solana-based dApps.

### Technology Stack
- **React** (Frontend library)
- **TypeScript** (Type-safe development)
- **Solana Wallet Adapter Libraries**
  - `@solana/wallet-adapter-base`
  - `@solana/wallet-adapter-react`
  - `@solana/wallet-adapter-react-ui`
  - `@solana/wallet-adapter-wallets`
  - `@solana/web3.js`
- **Tailwind CSS** (Styling)

## Project Structure

The main components of this application are:

1. **`WalletConnection.tsx`**: The main entry point that handles wallet connection and displays other components.
2. **`ShowBalance.tsx`**: Displays the SOL balance of the connected wallet.
3. **`SendTransaction.tsx`**: Allows the user to send a SOL transaction to a specified address.
4. **`SignMessage.tsx`**: Signs a message to prove wallet ownership.

## Getting Started

### Prerequisites

Before running this application, make sure you have the following:

- **Node.js** installed (v14 or above).
- **Yarn** or **npm** as a package manager.
- A **Solana wallet** like [Phantom](https://phantom.app/).

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/solana-wallet-adapter.git
    cd solana-wallet-adapter
    ```

2. **Install Dependencies**:

    ```bash
    yarn install
    ```

3. **Run the Application**:

    ```bash
    yarn start
    ```

4. **Open the Application**:

    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Solana Wallet Setup

This application uses `@solana/wallet-adapter-react` for wallet integration. Make sure you have a Solana wallet like Phantom or Solflare installed and set to the `devnet`.

## Application Walkthrough

### 1. **WalletConnection Component**

The `WalletConnection.tsx` component is the main entry point for the application. It handles:

- **Wallet Connection**: Using the `WalletMultiButton` from `@solana/wallet-adapter-react-ui`.
- **Request Airdrop**: A button that allows users to request test SOL from the devnet faucet.

The code snippet below shows how the component works:

```tsx
const requestAirdrop = useCallback(async () => {
    if (!publicKey) {
        alert("Wallet not connected");
        return;
    }

    try {
        const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        alert("Airdrop requested successfully");
    } catch (error) {
        console.error(error);
        alert("Airdrop failed");
    }
}, [publicKey, connection]);
```

This function uses the connected wallet's `publicKey` to request 1 SOL (represented in lamports) from the devnet. Upon a successful request, a confirmation is shown.

### 2. **ShowBalance Component**

This component fetches and displays the SOL balance of the connected wallet. It uses the `useConnection` and `useWallet` hooks provided by `@solana/wallet-adapter-react`.

- **Key Features**:
  - Fetches the current SOL balance using `connection.getBalance(publicKey)`.
  - Converts the balance from lamports to SOL using `LAMPORTS_PER_SOL`.
  - Automatically updates the balance whenever the wallet is connected.

Here's how the balance is fetched:

```tsx
useEffect(() => {
    const getBalance = async () => {
        if (publicKey) {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        }
    };

    getBalance();
}, [publicKey, connection]);
```

### 3. **SendTransaction Component**

This component allows users to send a transaction to another wallet address. It includes:

- **Input Fields**: For the recipient's address and the amount of SOL.
- **Transaction Creation**: Uses `SystemProgram.transfer` to create a transaction object.
- **Transaction Submission**: Submits the transaction using `sendTransaction` from the wallet context.

The main logic for sending a transaction:

```tsx
const transaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
    })
);

const signature = await sendTransaction(transaction, connection);
await connection.confirmTransaction(signature);
```

This creates a new transaction and sends the specified amount of SOL from the connected wallet to the recipient address.

### 4. **SignMessage Component**

The `SignMessage.tsx` component demonstrates message signing using the `signMessage` method from the wallet adapter. This is useful for:

- **Verifying Wallet Ownership**.
- **Proving Identity** without sending an on-chain transaction.

The signing logic is as follows:

```tsx
const message = new TextEncoder().encode('Hello, Solana!');
const signature = await signMessage(message);
alert(`Message signed! Signature: ${Buffer.from(signature).toString('hex')}`);
```

### 5. **Styling with Tailwind CSS**

Each component uses Tailwind CSS for styling, making it easy to customize the appearance without extensive CSS files. The classes such as `btn btn-primary` and `input` are defined using Tailwind's utility classes.

## Usage Flow

1. **Connect Wallet**: Use the wallet button to connect to a Solana wallet.
2. **Request Airdrop**: Click the "Request Airdrop" button to get test SOL.
3. **View SOL Balance**: The balance is displayed automatically.
4. **Send Transaction**: Enter the recipient's address and the amount of SOL, then click "Send".
5. **Sign Message**: Click "Sign Message" to sign a predefined message and get the signature.

