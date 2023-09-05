# Contents

- [Contents](#contents)
- [1. Transaction Output](#1-transaction-output)
  - [Transaction Outputs](#transaction-outputs)
  - [Your Goal: Create a TXO class](#your-goal-create-a-txo-class)
- [2. Spent TXOs](#2-spent-txos)
  - [Transactions](#transactions)
  - [Your Goal: Ensure Inputs are UTXOs](#your-goal-ensure-inputs-are-utxos)
- [3. Sufficient Amount](#3-sufficient-amount)
  - [Inputs \& Outputs](#inputs--outputs)
  - [Your Goal: Ensure Sufficient Input](#your-goal-ensure-sufficient-input)
- [4. Successful Execute](#4-successful-execute)
  - [Successful Transaction](#successful-transaction)
  - [Your Goal: Mark Inputs as Spent](#your-goal-mark-inputs-as-spent)
- [5. Miner's Fee](#5-miners-fee)
  - [Miner's Fee](#miners-fee)
  - [Your Goal: Calculate the fee!](#your-goal-calculate-the-fee)

# 1. Transaction Output
## Transaction Outputs

Now it's time to create an object for Transaction Outputs(TXOs)!

Using a Bitcoin Block Explorer you can look up TXOs on the actual network. If we wanted to look up UTXOs for a particular address, for instance:

https://blockchain.info/unspent?active=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa

    The value after active= is an address. This particular address was the one Satoshi used when they mined the first Bitcoin block.

## Your Goal: Create a TXO class

Let's complete the `constructor` and `spend` methods for the `TXO` class in the `TXO.js` file.

1. The `constructor` should store the values passed into it on properties of the same name. It should also create a property `spent` and default it to `false`.
2. The `spend` function should set the `spent` property to true. For example:
```js
const txo = new TXO("1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM", 10);

console.log( txo.owner ); // 1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM
console.log( txo.amount ); // 10
console.log( txo.spent ); // false

txo.spend();

console.log( txo.spent ); // true
```
Notice how `spent` is initially `false` when we create the new `TXO`. After invoking the `spend` function, `spent` should be set to `true`.

# 2. Spent TXOs
## Transactions

Transactions on the Bitcoin network can have **many inputs** and **many outputs**.

    You can take a look at this Bitcoin Transaction for an example of one with many outputs.

This combined with a [scripting system](https://en.bitcoin.it/wiki/Script) on each transaction allows Bitcoin users to engage in more complex financial agreements than one individual simply sending money to the other.

For your average transaction, the Script simply requires that new UTXOs can only be spent by the associated address.
## Your Goal: Ensure Inputs are UTXOs

On this stage, we introduce a new file `Transaction.js`.

In the `Transaction` constructor you'll see two arguments passed in: `inputUTXOs` and `outputUTXOs`. Both of these objects are arrays containing instances of transaction outputs.

1. Store `inputUTXOs` and `outputUTXOs` on the transaction object.
2. In the `execute` function do one thing for now: ensure that none of the `inputUTXOs` are already spent. We can't allow double-spending TXOs!
3. Throw an error in `execute` if any input TXO is already spent.

    The terminology between UTXO and TXO can sometimes get confusing. Remember that a TXO is just the nomenclature for a UTXO that is already spent!

# 3. Sufficient Amount
## Inputs & Outputs

With a multitude of input and output UTXOs allowed in every transaction, there are many possibilities of exchange that exist!

Bitcoin wallet software will sometimes choose to include many input UTXOs just to aggregate them into one bigger UTXO to send back to the owner.

For instance, if you have five UTXOs, each with amounts of 0.1 BTC, your wallet may choose to combine them into 0.5 BTC on the next transaction. Behind the scenes magic

The important part is ensuring there is **enough total value** in the input UTXOs to cover the total amount in the output UTXOs.
## Your Goal: Ensure Sufficient Input

1. Let's make sure that the `inputUTXOs` have enough total value in them to cover the total value of the `outputUTXOs`.
2. If the total value of the inputs **is less than** the total value of the outputs, throw an error in the `execute` function.

# 4. Successful Execute
## Successful Transaction

When a transaction is successful and mined to the blockchain, the **output UTXOs** become new TXOs that are ready to be spent. The **input UTXOs** need to be **marked as spent**, to ensure that they are not spent again!

After all, the whole purpose of the blockchain is to fix the double-spend problem
## Your Goal: Mark Inputs as Spent

If no errors are thrown during the `execute` function of the transaction, then it is successful! 

# 5. Miner's Fee
## Miner's Fee

At this point you may be wondering why in the third stage we only required that the total input amount **be more than** than the total output amount.

Shouldn't we *also* throw an error when the output amount turns out to be less?

Nope! Actually, **the remainder is given to the miner**!

This is a design choice in the Bitcoin system. It is referred to as the **transaction fee**.

The transaction fee can help expedite your request. A miner is much more likely to include your transaction in their next block if you include a nice hefty prize for them to collect!

    Bitcoin has a controlled supply. For a limited time there is a reward for the miner in every block. At a certain point, this will stop and the only reward for the miner will become the transaction fees.

## Your Goal: Calculate the fee!

At the end of the `execute` function, calculate the fee as the sum of all the inputs minus the sum of all the outputs.

1. Given that we throw an error if the inputs are insufficient, this number should be **at least zero**. Any time outputs are less, this should be a positive fee.
2. Store the fee amount in a property called `fee` on the transaction itself.

For example:
```js
const iTXO = new TXO(fromAddress, 5);
const oTXO = new TXO(toAddress, 3);

const tx = new Transaction([iTXO], [oTXO]);

tx.execute();

console.log( tx.fee ); // 2
```
Nice tip! 