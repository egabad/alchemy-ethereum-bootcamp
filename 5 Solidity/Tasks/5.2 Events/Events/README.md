# Contents
- [Contents](#contents)
- [1. Deployed](#1-deployed)
  - [Emitting an Event](#emitting-an-event)
  - [🏁 Your Goal: Deployed Event](#-your-goal-deployed-event)
- [2. Transfer](#2-transfer)
  - [Multiple Arguments](#multiple-arguments)
  - [🏁 Your Goal: Transfer the Collectible](#-your-goal-transfer-the-collectible)
- [3. Up For Sale](#3-up-for-sale)
  - [🏁 Your Goal: Mark the Price](#-your-goal-mark-the-price)
  - [🔒 Function Security](#-function-security)
- [4. Sale](#4-sale)
  - [🏁 Your Goal: Make a Purchase!](#-your-goal-make-a-purchase)
  - [🔒 Function Security](#-function-security-1)
- [5. Indexed](#5-indexed)
  - [Indexed](#indexed)
  - [🏁 Your Goal: Index the Addresses](#-your-goal-index-the-addresses)

# 1. Deployed
## Emitting an Event

To emit an event, we need to take two steps. First, we need to declare the event:
```
event ExampleEvent(uint _exampleArgument);
```
☝️ The `event` keyword prefaces the event declaration, otherwise, it's quite similar to function syntax without the additional keywords and function body.

    ✅ Functions and Events use a different naming convention. Events are typically UpperCamelCase whereas function names are lowerCamelCase. This is a style-choice, so the compiler will not enforce this rule. However, it's generally best to stick to convention.

Then we must `emit` the event from inside of a function body:
```
function exampleFunction() external {
    emit ExampleEvent(5);
}
```
☝️ We use the keyword `emit` prior to invoking the event. Then we can pass it the argument just like we would for a function.

    🔍 Curious to see how we can look up events after the transaction? Let's take a look in details.

## 🏁 Your Goal: Deployed Event

1. Create a new `event` called `Deployed`. This event should take one argument: an `address`.
2. This address will be the first **owner** of this collectible. The owner in this case will be the address that deployed the contract.
3. Create a public `constructor`. In this constructor, emit the `Deployed` event with the owner's address as the argument.

# 2. Transfer
## Multiple Arguments

It's possible to pass **multiple arguments** to an event just like a function:
```
event ExampleEvent(
    uint _exampleArgument, 
    bool _exampleArgument2
);
```
    🔍 It's not necessary to specify the names of the arguments. Let's take a look at why you might want to in details.

Then we can invoke it the same way we would with one argument:
```
emit ExampleEvent(3, true);
```
## 🏁 Your Goal: Transfer the Collectible

1. Create a new event called `Transfer` which has two `address` parameters: the original owner and the new owner.
2. Create an external function called `transfer` which takes a recipient `address` to send the collectible to. In this function, transfer the ownership of the collectible to the recipient.
3. Then, emit the `Transfer` event with the original owner's address and the new owner's address as arguments (be sure to specify the event arguments in that order).
4. Ensure that the person calling this function **is the current owner** of the collectible. Otherwise, revert the transaction.

    ✅ The owner of the collectible should be initially set as the deployer of the contract. You'll need to store this value into a state variable from the constructor so you can check for it in this function.

# 3. Up For Sale
## 🏁 Your Goal: Mark the Price

1. Create a new event called `ForSale` which takes two `uint` parameters: the price and the current block timestamp.
2. Create a new external function called `markPrice` which has a single `uint` parameter: the asking price.
3. Inside the `markPrice` function, emit the `ForSale` event with the price and block timestamp as its arguments. *HINT: `block.timestamp` is a global variable*

## 🔒 Function Security

Ensure that the person calling this function **is the current owner** of the collectible. Otherwise, revert.

# 4. Sale
## 🏁 Your Goal: Make a Purchase!

1. Create an event called `Purchase` which takes two arguments: a `uint` for the purchase amount, and an `address` for the buyer.
2. Create an external, payable function `purchase` which allows a buyer to purchase the collectible at the asking price.
3. To make this purchase happen you'll need to do 3 things:
  1. Transfer the `msg.value` to the seller.
  2. Transfer the ownership to the buyer.
  3. Mark the collectible as not for sale any longer.
  4. Emit a Purchase event.

**Reminder** - To send ether, you can use the `.call` syntax. Let's say we're trying to send the `msg.value` to an address called `anAddress`:
```
(bool success, ) = anAddress.call{ value: msg.value }("");
require(success);
```
## 🔒 Function Security

1. Ensure that the value sent matches the price. It doesn't, revert the transaction. We don't want to allow someone to buy this for cheaper than the asking price!
2. Ensure that the collectible was marked for sale prior to this transaction. If it wasn't, revert the transaction.

    📖 The default value for a `uint` is `0`. If you store the price in a `uint` you can use this as the **not-for-sale** default value. We will not call this function for a "free purchase".

# 5. Indexed
## Indexed

We can make it easy to filter on event arguments by adding an `indexed` keyword:
```
event HighScore(address indexed player);
```
Now we can filter for both the `HighScore` event as well as the `address` of the player.

    🔍 Let's take a closer look in details.

## 🏁 Your Goal: Index the Addresses

Modify all the `address` data types in the events to be indexed.