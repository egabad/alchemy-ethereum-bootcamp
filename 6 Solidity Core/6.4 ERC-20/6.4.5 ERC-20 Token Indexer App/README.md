# ERC-20 Indexer App

## Description
This app provides users with a comprehensive view of ERC-20 token balances associated with a particular Ethereum address. Leveraging the Alchemy SDK rigged to Alchemy's Enhanced APIs, this application delivers accurate and up-to-date information on ERC-20 token holdings.

## Setup
To get started with the ERC-20 Indexer App, follow these simple steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file and save the Ethereum mainnet Alchemy API key as `VITE_API_KEY`.
5. Run `npm run dev` to start the development server.
6. Access the app through your web browser at the provided local server address.

## Features
- **Alchemy Integration:** Utilizes Alchemy SDK for seamless data retrieval.
- **ERC-20 Balances:** Retrieves and displays ERC-20 token balances associated with a specified Ethereum address.
- **Wallet Integration:** Supports wallet connection for fetching user's own ERC-20 balances.
- **ENS Support:** Enhanced usability with Ethereum Name Service (ENS) support for address resolution.
- **Improved UI:** Offers a user-friendly interface with features such as loading indication, grid display for clear presentation, and error & warning toasts for effective feedback.

## Usage
1. Input options:
  - Enter the Ethereum address you wish to inspect in the provided input field.
  - Provide a valid ENS name.
  - Lastly, you can also fetch your own ERC-20 balances by clicking the Connect Wallet. Make sure the input field is empty.
2. Click on the submit button to retrieve ERC-20 token balances associated with the entered address.
