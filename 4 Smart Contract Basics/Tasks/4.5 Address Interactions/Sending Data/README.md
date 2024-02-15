# Contents
- [Contents](#contents)
- [1. Call Function](#1-call-function)
  - [Interfaces](#interfaces)
  - [🏁 Your Goal: Alert Hero](#-your-goal-alert-hero)
- [2. Signature](#2-signature)
  - [Function Signature](#function-signature)
  - [🏁 Your Goal: Alert Hero, Manually](#-your-goal-alert-hero-manually)
- [3. With Signature](#3-with-signature)
  - [Encode With Signature](#encode-with-signature)
  - [Your Goal: Alert the Hero with Arguments](#your-goal-alert-the-hero-with-arguments)
- [4. Arbitrary Alert](#4-arbitrary-alert)
  - [Taking Calldata](#taking-calldata)
  - [🏁 Your Goal: Pass Calldata](#-your-goal-pass-calldata)
- [5. Fallback](#5-fallback)
  - [Fallback](#fallback)
  - [🏁 Your Goal: Trigger the fallback](#-your-goal-trigger-the-fallback)

# 1. Call Function
## Interfaces

The simplest way to program a contract to communicate with another contract is by defining the contract you're interacting with. Interfaces provide this functionality for us, so for example:
```
interface IToken {
    function getBalance(address user) external;
}
```
☝️ We can use this interface to properly communicate with a token contract that implements the `getBalance` method:
```
// tokenAddress: a contract adddress we want to communicate with
// userAddress: the address we want to lookup the balance for
uint balance = IToken(tokenAddress).getBalance(userAddress);
```
Behind the scenes Solidity is creating a message call that follows the calldata format described in the introduction.
## 🏁 Your Goal: Alert Hero

Use the `IHero` interface and the `hero` address passed into `sendAlert` to alert the hero from the Sidekick contract.

# 2. Signature
## Function Signature

As mentioned in the introduction, the first step to forming calldata manually is taking the keccak256 hash of the function signature you are targeting.

So, for example, if we we are trying to call `rumble`:
```
function rumble() external;
```
☝️ We need to take the keccak256 hash of `rumble()` and grab the first 4 bytes. As it turns out, those 4 bytes are `0x7e47cd7e`. This would be our entire calldata to make the function call to `rumble` on a contract!
## 🏁 Your Goal: Alert Hero, Manually

Alert the Hero, manually this time!

Fill in the function signature for the Hero's `alert` function. Notice that we are taking the first 4 bytes of the hash of this function and passing it in as calldata to the hero.

# 3. With Signature
## Encode With Signature

As a bit of a shortcut to the previous stage, we can learn about the method `abi.encodeWithSignature`! This method will do everything we did in the last stage, in one function.

So this:
```
bytes4 memory payload = abi.encodePacked(bytes4(keccak256("rumble()")));

(bool success, ) = hero.call(payload);
```
Becomes:
```
bytes memory payload = abi.encodeWithSignature("rumble()");

(bool success, ) = hero.call(payload);
```
And if you want to add arguments, you can add them to signature and as comma separted arguments to the `encodeWithSignature` method. If `rumble` took two `uint` arguments, we could pass them like this:
```
bytes memory payload = abi.encodeWithSignature("rumble(uint256,uint256)", 10, 5);

(bool success, ) = hero.call(payload);
```
## Your Goal: Alert the Hero with Arguments

Alert the `Hero` by calling `alert` and passing the number of `enemies` and whether or not they are `armed`!

    🔍 Be careful! The type uint is an alias for uint256 but only uint256 will work with abi.encodeWithSignature. Click on the details to learn more.

# 4. Arbitrary Alert
## Taking Calldata

If we take calldata as an argument to a function we can pass that arbitrary calldata along to another contract. This can allow the message sender to decide which function to call and with what arguments.

This can be super useful, especially in contracts that require many people to pass their approval before a transaction is executed. We'll talk about decentralized organizations and multiple-signature wallets later on in the course and you'll see that storing calldata for later use is critical for maximum flexibility in these cases.
## 🏁 Your Goal: Pass Calldata

The Sidekick needs to be able to relay any calldata along to the Hero. Update the `relay` function to take the `data` and send it to the `Hero` as calldata.

# 5. Fallback
## Fallback

When calldata is sent to a contract, and the contract doesn't have a function signature to match the selector, it will trigger its fallback function.

So if we chose 4 bytes randomly and sent them to a contract, most likely this will not match a function signature and will invoke the fallback function if there is one. You could also choose to send less than 4 bytes or more than 4 bytes. So long as that first 4 bytes does not match a function selector, the fallback function will be triggered.
## 🏁 Your Goal: Trigger the fallback

In the `makeContact` method, send some calldata to the `Hero` contract that will trigger its fallback function.