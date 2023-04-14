# VentureVerse

VentureVerse is a decentralized crowdfunding platform built on the Ethereum blockchain, allowing users to create and support companies in a secure and transparent way.

This project is built using Solidity ^0.8.9 and relies on the OpenZeppelin Contracts library for access control.

## Smart Contract Overview

The `VentureVerse` smart contract allows users to:

- Create a new company with a title, description, end date, and required donations.
- Make donations to existing companies.
- View the amount donated by a specific user for a given company.
- Withdraw the balance of the contract by the owner.

## Prerequisites

To set up and run the project locally, you will need the following:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [Hardhat](https://hardhat.org/) (for local development and testing)
- [MetaMask](https://metamask.io/) (for interacting with the contract on a test network)

## Setup

1. Clone this repository:
git clone https://github.com/Bubble7777/VentureVerse.git

2. Change into the project directory:
cd VentureVerse

3. Install dependencies:
npm install

## Compile

Compile the smart contract by running:

npx hardhat compile

## Testing

### Hardhat

Run the tests using Hardhat:

npx hardhat test

## Deployment

To deploy the smart contract to a test network (e.g., Rinkeby) or the mainnet, follow these steps:

1. Add your MetaMask mnemonic and desired network details to a `.env` file in the project root:

MNEMONIC="your metamask mnemonic"
RINKEBY_URL="https://rinkeby.infura.io/v3/your_infura_project_id"

2. Deploy using Hardhat:

npx hardhat run scripts/deploy.js --network rinkeby

3. Note the contract address in the output.

## Interacting with the Contract

After deploying the smart contract, you can interact with it using the Remix IDE or a web interface built using a library like [ethers.js](https://docs.ethers.io/v5/) or [web3.js](https://web3js.readthedocs.io/en/v1.3.4/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
