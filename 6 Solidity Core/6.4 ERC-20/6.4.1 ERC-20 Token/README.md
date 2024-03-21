# Contents
- [Contents](#contents)
- [1. Total Supply](#1-total-supply)
  - [ERC20 Tokens](#erc20-tokens)
  - [🏁 Your Goal: Token Supply](#-your-goal-token-supply)
- [2. Configuration](#2-configuration)
  - [Token Configuration](#token-configuration)
  - [🏁 Your Goal: Configuration 🎛️](#-your-goal-configuration-️)
- [3. Balances](#3-balances)
  - [Token Balances](#token-balances)
  - [🏁 Your Goal: Balances](#-your-goal-balances)
- [4. Minting](#4-minting)
  - [Minting](#minting)
  - [💰 Setting the Supply](#-setting-the-supply)
  - [🏦 Set the Balance](#-set-the-balance)
  - [🏁 Your Goal: Supply](#-your-goal-supply)
- [5. Transfer](#5-transfer)
  - [Token Transfers](#token-transfers)
  - [🏁 Your Goal: Transfer](#-your-goal-transfer)
  - [🔒 Contract Security](#-contract-security)
- [6. Transfer Event](#6-transfer-event)
  - [Events 📣](#events-)
  - [🏁 Your Goal: Transfer Event](#-your-goal-transfer-event)

# 1. Total Supply
## ERC20 Tokens

In this lesson, you will create a smart contract called a **Token** smart contract. You can think of tokens like dollars (or any other type of asset). Tokens can be given to other people, they can be lent to other people via allowances, and you can see how many tokens someone owns.

Each ERC20 token has its own **supply** which is the total number of the tokens that are in circulation. Tokens can be **minted** to addresses in any number of creative ways. The majority of the time they are minted to a single address and transferred to a crowdsale contract.

    📖 The term mint here is used to describe the creation of a new token. It was traditionally used to describe the creation of new coins. The origins of this word are quite old, according to Wikipedia, it is originally attributed to 269 BC! 🏛️

## 🏁 Your Goal: Token Supply

Let's create a supply for our token!

1. Create a new public `uint` state variable called `totalSupply`.
2. Leave its value as the default `uint` value for now, `0`, we will change this later!

# 2. Configuration
## Token Configuration

When you look at a list of ERC20 tokens, like on Etherscan, you'll see each ERC20 token has its own **name** and **symbol** associated with it.

The name is generally its primary identifier, while the symbol is in parentheses. **Maker (MKR)**, for instance, has the name Maker and symbol MKR.

Each of these tokens will also generally have its own **decimals** value, indicating the number of places we need to move the decimal to get to the user representation of the token.

    🔍 To understand decimals on a deeper level let's take a look at the details tab.

You may notice that some of the tokens listed on Etherscan have similar **market capitalizations** with wildy different prices. Why is this so? 🤔

Market Capitalization, or market cap for short, is simply the current price for the token multiplied by its total supply. Since many of these tokens have very different `totalSupply` values, their prices wind up quite different!

    🧐 It's interesting to note that while these values are on most ERC20 tokens, they are, in fact, optional. An ERC20 token does not need to specify its name, symbol or decimals to adhere to the standard. These values are purely for added usability.

## 🏁 Your Goal: Configuration 🎛️

Create three public state variables:

1. A `string name` - Create any name you'd like with at least 1 character
2. A `string symbol` - Create any symbol you'd like with 3 characters
3. A `uint8 decimals` - Store 18 in this variable

    💡 Most ERC20 tokens follow the ether standard of having 18 decimals.

# 3. Balances
## Token Balances

It's essential for users to be able to see how many tokens they have in our **Token** contract, so that they know how much they can spend. At the moment, there isn't a way for users to see how many tokens they have.
## 🏁 Your Goal: Balances

1. Create a mapping which maps an `address` to a `uint256` value. This will give each address its own balance.
2. Create an external, view function `balanceOf` which takes an address and returns the `uint` balance corresponding to the address in the mapping.

# 4. Minting
## Minting

It's time to create our tokens and do the initial distribution!
## 💰 Setting the Supply

We can set the initial supply based on the number of tokens we want available. This will be the number of whole tokens multiplied by `10 ** 18` for the `18` decimals we supplied.

If we only wanted 5 total tokens in circulation it would be `5 * (10 ** 18)` or `5000000000000000000`. We could distribute these 5 tokens with 18 decimal places of precision.
## 🏦 Set the Balance

Depending on the circumstance, tokens can be distributed in different ways:

- For instance, tokens can be minted as needed, which is useful for an uncapped distribution.
  - This could work for a timed crowdsale or perhaps through a game that requires participation to receive tokens.
- Tokens can also be distributed upfront to a single address.
  - This address is then the sole owner of all the tokens and they can choose how to distribute the tokens as necessary. They can move it all into a crowdfunding contract or they can distribute it manually.

We're going to go with the latter of the two above approaches!
## 🏁 Your Goal: Supply

Create a constructor which will do two things:

1. Set the `totalSupply` to **1000 tokens**
2. Set the balance of the contract deployer to be the `totalSupply`

# 5. Transfer
## Token Transfers

Both the balances mapping and the **balanceOf** function can be used to get the balance of a given Ethereum address in the token contract.

To transfer tokens, the sender's balance should be decreased by the transfer amount. Then, the balance of the recipient of the transfer should be increased by the same amount.

The balance of the sender can be decreased as follows:
```
contract Token {
    mapping (address => uint256) balances;

    function decreaseBalance(uint256 _value) public {
        balances[msg.sender] -= _value;
    }
}
```
☝️ This function will decrease the balance of the `msg.sender` by the specified `_value`.
## 🏁 Your Goal: Transfer

Create a public function `transfer` which takes an `address` for the recipient and a `uint` for the amount to be transferred.

Transfer the amount from the function caller to the recipient.

Return `true` after a successful transfer.
## 🔒 Contract Security

Ensure that `msg.sender` has enough in their balance to send this amount. Otherwise, revert the transaction.

# 6. Transfer Event
## Events 📣

Events give external applications a way to "listen in" on the happenings inside of the EVM. Events can essentially act as hooks for an application to perform some action.

An example of a UI listening for changes to our ERC20 Token might be a Decentralized Exchange. It's waiting to see a transfer to or from your account to update your balance. It could subscribe to events on an Ethereum node and then broadcast any changes to the web interface where your balance is displayed.

    💡 To understand transfer events on a deeper level check out Alchemy's Transfers API

## 🏁 Your Goal: Transfer Event

Create an event called `Transfer` which takes three arguments in the following order:

1. The `address` that sent the token
2. The `address` that received the token
3. The `uint256` value amount of the token sent

Then, `emit` the event from inside the `transfer` function with all the appropriate arguments.