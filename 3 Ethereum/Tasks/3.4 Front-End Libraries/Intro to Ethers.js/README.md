# Contents
- [Contents](#contents)
- [1. Making Wallets](#1-making-wallets)
  - [Let's Make Wallets](#lets-make-wallets)
  - [Your Goal: Instantiate two Wallets](#your-goal-instantiate-two-wallets)
- [2. Sign a Transaction](#2-sign-a-transaction)
  - [Signing Transactions](#signing-transactions)
  - [Your Goal: Fill in the Properties](#your-goal-fill-in-the-properties)
- [3. Connect to Ethereum](#3-connect-to-ethereum)
  - [Connect to Ethereum](#connect-to-ethereum)
  - [Your Goal: Broadcast the TX to Ethereum](#your-goal-broadcast-the-tx-to-ethereum)
- [4. Account Nonce](#4-account-nonce)
  - [Account Nonce](#account-nonce)
  - [Your Goal: Add the Nonce](#your-goal-add-the-nonce)
- [5. Find Balance](#5-find-balance)
  - [Retrieve the Balance](#retrieve-the-balance)
  - [Your Goal: Get the Balance](#your-goal-get-the-balance)
- [6. Charitable Donations](#6-charitable-donations)
  - [Donating to Charities](#donating-to-charities)
  - [Your Goal: Complete the function donate](#your-goal-complete-the-function-donate)

# 1. Making Wallets
## Let's Make Wallets

First task is simple: create two [wallets](https://university.alchemy.com/course/ethereum/sc/5d6e7a3847e43837b005c4d8/stage/5d6e7a7147e43837b005c4d9?tab=details&scroll=Wallet)!

We're going to look at two different ways to instantiate a wallet: from a [private key](https://university.alchemy.com/course/ethereum/sc/5d6e7a3847e43837b005c4d8/stage/5d6e7a7147e43837b005c4d9?tab=details&scroll=Private%20Key) and from a [mnemonic phrase](https://university.alchemy.com/course/ethereum/sc/5d6e7a3847e43837b005c4d8/stage/5d6e7a7147e43837b005c4d9?tab=details&scroll=Mnemonic).
## Your Goal: Instantiate two Wallets

In ethers.js you can create a [new wallet](https://docs.ethers.io/v5/api/signer/#Wallet-constructor) by invoking its constructor with a private key, or by using the `.fromMnemonic` method

1. Use this private key as a string to create the first wallet:
```
"0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d"
```
    Never use this private key to store anything on a mainnet! Once private keys have been shared publicly, they are no longer safe. In fact, there are machines watching activity on addresses with known private keys. If you send money to such an address, it will likely be gone in seconds!

2. Pass these words to create the second wallet:
```
"plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice"
```
    Be just as cautious with mnemonic phrases as you would be with private keys. Don't share a mnemonic phrase that is storing funds on the mainnet, and certainly don't use the one above for storing anything of value!

# 2. Sign a Transaction
## Signing Transactions

When a transaction is broadcasted to Ethereum, how do we know who it's from? And how can we say for sure that **they authorized it**?

In the last stage, we created a wallet using a private key. Now we're going to use that wallet to [sign a transaction](https://university.alchemy.com/course/ethereum/sc/5d6e7a3847e43837b005c4d8/stage/5d6e873547e43837b005c4dd?tab=details&srcoll=Signing%20Transactions)!
## Your Goal: Fill in the Properties

In this stage you'll need to modify the `sign.js` file . You may have noticed `wallet1` has already been imported for you! We're going to use this wallet to sign a transaction.

We'll use the [wallet.signTransaction](https://docs.ethers.io/v5/api/signer/#Signer--signing-methods) method from the ethers.js library!

Since the library already knows our private key, all we need to do is fill in our properties and it will handle the digital signature! Fill in the `value`, `to`, `gasLimit` and `gasPrice` properties.

**value**

For the `value`, we'll want to send 1 ether. The `value` property here is in Wei ([the smallest subdenomination of Ether](https://ethdocs.org/en/latest/ether.html)).

    You could convert it yourself and supply it as a string (10^18 Wei = 1 Ether ). Alternatively you can use a parsing utility from Ethers.

**to**

For the `to` property, supply an address, which would be a 40 character hexadecimal string. Here is the address to send the ether to:
```
"0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92"
```
    ⚠️ NOTE The below instructions use the legacy (Type 0) form of sending transactions on Ethereum. In future exercises we will use the newer version (Type 2) for sending transactions that has a much more efficient mechanism for gas estimation.

**gasLimit**

The amount of gas required to transfer ETH from one account to another is 21000. Note that gas is an abstraction of computational complexity in the EVM and is not tied to any real world cost.

Since we are transferring ETH, the gasLimit needs to be set to 21000.

To calculate the actual cost (in Gwei) to transfer ETH from one account to another we need to use the Ethereum network's `baseFeePerGas`.

**baseFeePerGas**

*For historical and backwards-compatibility reasons this property is still named `gasPrice` in popular Etherum front-end libraries such as ethers.js. However, protocol level code and docs will refer to this property as `baseFeePerGas`, which is semantically a more accurate name.*

`baseFeePerGas` is the max amount of Gwei required per unit of gas used for the transaction to be included in the next block. The base fee is a dynamic value that moves up and down depending on network demand and is set by the network itself.

This value works similarly to how car gas prices work in real life. It takes the same amount of gas to get from point A to point B, but the price of the gas changes based on demand.

To calculate the minimum amount of Gwei needed to transfer ETH we use the formula: 21000 * baseFeePerGas. When the transfer transaction executes this amount of ETH will be burned by the network.

**Notes**

- *Developers should almost never set this value directly - as it is calculated by the network itself.*
- *Instead, if developers want to create 'dynamic fee' transactions the developer should leave this field empty and set the `maxPriorityFeePerGas` and `maxFeePerGas` fields described below. However, even using these fields is the exception rather than the rule.*
- *If you'd like to know more about the historical `gasPrice` field you can read more about the details of it in the docs on [Ethereum's London Upgrade](https://eips.ethereum.org/EIPS/eip-1559).*

**maxPriorityFeePerGas**

An extra amount of Gwei per unit of gas beyond the base fee that one is willing to pay to give priority to their transaction to being included in the next block. Think of it as a tip to the block validator creating the next block. This extra amount of Gwei goes to the validator and does not get burned.

*Developers should usually leave this value unset and use the default value that ethers.js determines from the network.*

**maxFeePerGas**

The combined (base fee + priority fee) maximum amount of Gwei per unit of gas one is willing to pay to have their transaction included in the next block.

*Developers should usually leave this value unset and use the default value that ethers.js determines from the network.*

# 3. Connect to Ethereum
## Connect to Ethereum

In the previous stages, we created a wallet and used that wallet to sign a transaction.

Has the transaction been processed on Ethereum? … No?

Oh! **We need to broadcast the transaction to the network!**

It's time to connect to Ethereum! For this, we'll use an ethers.js [provider](https://university.alchemy.com/course/ethereum/sc/5d6e7a3847e43837b005c4d8/stage/5d6e8f6c47e43837b005c4e3?tab=details&scroll=Provider). In our case we'll be connecting to a local ganache instance for testing purposes. If you wanted to connect to the mainnet, you could simply configure the provider to point at our [Alchemy API key](https://alchemy.com/?a=eth-bootcamp).
## Your Goal: Broadcast the TX to Ethereum

In order to broadcast a transaction to the network we'll need to create a provider, connect our wallet to that provider, and finally broadcast the `rawTx` through the provider. We can do this!

1. **Create the Provider**

To create the ethers.js provider, use the `ganacheProvider` passed in from `config`. The `ganacheProvider` is considered a `Web3Provider` by ethers.js. So we'll need to instantiate a new Web3Provider:
```js
const { providers } = require('ethers');

const provider = new providers.Web3Provider(ganacheProvider);
```
This will create a new ethers.js provider for us to connect to ganache.

    You can see all the different types of ethers.js providers here.

2. **Broadcast the Transaction**

Finally, it's time to broadcast the transaction to Ethereum.

You can use [provider.sendTransaction](https://docs.ethers.io/v5/api/providers/provider/#Provider-sendTransaction) and pass it the `rawTx`.

Be sure to return the resulting promise of this function call!

# 4. Account Nonce
## Account Nonce

Time to expand on the code from the last stage. We made a `sendEther` function that will broadcast a transaction to the Ethereum network through our provider. Unfortunately this code doesn't work if we try to run multiple transactions.

The test cases on this stage attempt to send multiple transactions. You'll see this issue if you try and run the tests now:
```
TXRejectedError: the tx doesn't have the correct nonce. account has nonce of: 1 tx has nonce of: 0
```
Remember our old friend, the account `nonce`? It keeps a running total of the number transactions sent from an account. The account nonce must be incremented after each successful transaction!

    Check out details for a refresher on what could happen without a nonce to protect your transactions!

## Your Goal: Add the Nonce

We need to ensure the nonce is included in our transaction!

There's technically two ways to go about this. For one, we can use [provider.getTransactionCount](https://docs.ethers.io/v5/api/providers/provider/#Provider-getTransactionCount) to find the current transaction count and add a **nonce** parameter to our signed transaction.

**OR...**

We can use [wallet.sendTransaction](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction).

This method can **sign the transaction** *and* use the provider to **fill in any missing properties**. It's a one-stop shop!

*First*, we'll need to connect our wallet to our provider:
```js
// add the provider to our wallet as the second parameter
const wallet = new Wallet(PRIVATE_KEY, provider);
```
Now our wallet knows how to take care of business! We can use `wallet.sendTransaction` to **replace both** `wallet.signTransaction` and `provider.sendTransaction`.

Simply provide the transaction parameters directly to `wallet.sendTransaction` and return the resulting promise!

    There's quite a bit wallet.sendTransaction does for us under the hood, let's take a look in details.

# 5. Find Balance
## Retrieve the Balance

We'll leave this stage mostly up to you, but don't panic!

You know enough to figure this one out.
## Your Goal: Get the Balance

Given a `privateKey`, return a promise that will resolve with the balance of the address associated with it.

    Use this list of methods that a Wallet connected to a provider will have.

# 6. Charitable Donations
## Donating to Charities

Final Stage! This one is a bit of a challenge.

It's time to take everything you've learned and put it all together.
## Your Goal: Complete the function donate

The function `donate` will take a private key and an array of charity addresses as it's two arguments.

The private key corresponds to an address pre-loaded with 10 ETH.

You will need to donate **at least one ether** to each of the charities in the array.
