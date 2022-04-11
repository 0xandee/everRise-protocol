# Defi Farming Full-stack
This is a repo to build your own full stack defi staking application for yield farming. Inspired from: [This repository](https://github.com/PatrickAlphaC/defi-stake-yield-brownie)

You can view the live interactive version here https://fr3aking.github.io/everRise-protocol/

**Note:**
1. You are able to test the everRise Protocol without spending cryptoassets  on the available testnets for each network.
2. To get started, make sure to switch your wallet provider to the Kovan testnet network in order to use the protocol testnet without incurring costs on the mainnet network.
3. Testnet networks are different environments from mainnet and simulate real use cases for development, testing or production.
4. The assets on a testnet are not “real,” meaning that they cannot be withdrawn to your wallet for any real economic value.  

**Functions**
- `stakeTokens`: Add any approved token to the farming contract for yeild farming, collateral, or whatever you want to do.
- `unStakeTokens`: Remove your tokens from the contract.
- `getUserTotalValue`: Get the total value that users have supplied based on calculations from the Chainlink Price Feeds. 
- `issueTokens`: Issue a reward to the users staking on your platform!

## Installation

1. [Install Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html)

```bash
pip install eth-brownie
```

2. Clone this repo
```
git clone https://github.com/Fr3aKiNg/everRise-protocol
```

1. [Install ganache-cli](https://www.npmjs.com/package/ganache-cli)

```bash
npm install -g ganache-cli
```

If you want to be able to deploy to testnets, do the following. 

4. Set your environment variables

Set your `WEB3_INFURA_PROJECT_ID`, and `PRIVATE_KEY` [environment variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). 

You can get a `WEB3_INFURA_PROJECT_ID` by getting a free trial of [Infura](https://infura.io/). At the moment, it does need to be infura with brownie. You can find your `PRIVATE_KEY` from your ethereum wallet like [metamask](https://metamask.io/). 

You'll also need testnet rinkeby or Kovan ETH and LINK. You can get LINK and ETH into your wallet by using the [rinkeby faucets located here](https://docs.chain.link/docs/link-token-contracts#rinkeby). If you're new to this, [watch this video.](https://www.youtube.com/watch?v=P7FX_1PePX0)

You'll also want an [Etherscan API Key](https://etherscan.io/apis) to verify your smart contracts. 

You can add your environment variables to the `.env` file:
```bash
export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
export PRIVATE_KEY=<PRIVATE_KEY>
export ETHERSCAN_TOKEN=<YOUR_TOKEN>
```
> DO NOT SEND YOUR KEYS TO GITHUB
> If you do that, people can steal all your funds. Ideally use an account with no real money in it. 

# Useage

## Scripts

```bash
brownie run scripts/deploy.py
```
This will deploy the contracts, depoly some mock Chainlink contracts for you to interact with.
```bash
brownie run scripts/deploy.py --network kovan
```
This will do the same thing on Kovan.

## Front end
```bash
cd front_end
yarn
yarn start
```
and you'll be able to interact with the UI

# License

This project is licensed under the [MIT license](LICENSE).
