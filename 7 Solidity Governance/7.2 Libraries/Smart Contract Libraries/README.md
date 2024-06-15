# Contents
- [Contents](#contents)
- [1. UInt Library](#1-uint-library)
  - [Libraries 📚](#libraries-)
  - [🏁 Your Goal: Library Function 📚🚀](#-your-goal-library-function-)
- [2. Using Library](#2-using-library)
  - [Using the Library](#using-the-library)
  - [🏁 Your Goal: Even Teams](#-your-goal-even-teams)
- [3. Console Log](#3-console-log)
  - [Console Log](#console-log)
  - [🏁 Your Goal: Find the Secret!](#-your-goal-find-the-secret)
- [4. Evenly Divides](#4-evenly-divides)
  - [Base Functions](#base-functions)
  - [🏁 Your Goal: Evenly Divides](#-your-goal-evenly-divides)
- [5. Is Prime](#5-is-prime)
  - [Building on Functions](#building-on-functions)
  - [🏁 Your Goal: Is it Prime?](#-your-goal-is-it-prime)
- [6. Next Prime](#6-next-prime)
  - [Block Global](#block-global)
  - [🏁 Your Goal: Prime Block Winner](#-your-goal-prime-block-winner)

# 1. UInt Library
## Libraries 📚

Libraries are quite similar to contracts! They are defined with the same syntax: `contract C {}` and `library C {}`. They both contain functions with all the same properties, types and syntax. They have access to the same global variables and opcodes.

So what are the differences? 🤔

One **major difference** between libraries and contracts is that libraries **do not have state**. Trying to declare a state variable on a library will not compile.

    📖 Libraries also cannot receive ether, inherit (or be inherited from), or be destroyed. These are functions of contracts we will cover later in the curriculum.

The purpose of libraries is to **share code**.

Ideally libraries contain functions with **basic reusable algorithms**. This will help developers stop themselves from re-inventing the wheel! 🎡

Good libraries are rigorously tested and audited. Using such a library is a benefit to your contract as less new code reduces your chances for bugs! 🐛

    🔒 OpenZeppelin provides many great Solidity libraries that have been audited by leading security firms in the field.

## 🏁 Your Goal: Library Function 📚🚀

1. Create a public pure function called `isEven`.

    🔍 This must be a **pure** or **view** function. Let's explore this further in details.

2. This function should take a `uint` as a parameter and return a `bool` indicating if the integer is even.

    💡 Recall that the **modulo operator** is available in Solidity! It returns the remainder after division so `3 % 2` will evaluate to `1` while `4 % 2` will evaluate to `0`.

# 2. Using Library
## Using the Library

Now that we have a library with a useful function, it's time to use it! 😁

Libraries can be called directly, just as they were in the test cases of the last stage. However, they are more commonly imported into contracts.

    🔍 How are libraries imported into contracts? Let's take a closer look at the technical details. 🤓

Let's use the library we built in the last stage in an `Example` contract!

There's two ways to do this. First:
```
import "./UIntFunctions.sol";
contract Example {
    function isEven(uint x) public pure returns(bool) {
        return UIntFunctions.isEven(x);
    }
}
```
☝️ Here we can explicitly reference the `UIntFunctions` library and invoke its function `isEven`.

The other way to do this:
```
import "./UIntFunctions.sol";
contract Example {
    using UIntFunctions for uint;
    function isEven(uint x) public pure returns(bool) {
        return x.isEven();
    }
}
```
☝️ In this example, we're applying the `UIntFunctions` library to the `uint` data type. This will add all the functions in the library to any `uint` in our contract. So flashy! 😎
## 🏁 Your Goal: Even Teams

We have a contract called `Game`, you can find it on the new `Game.sol` tab! 🕹️

This contract has two state parameters: `participants` and `allowTeams`.

1. Your goal is to create a constructor which takes a `uint` parameter for the number of participants in the game.
2. Store this `uint` in the `participants` state variable.
3. This game can be played free-for-all or team-against-team. To make sure the teams have the same number, ensure that the boolean `allowTeams` is only `true` if the number of participants is even.

# 3. Console Log
## Console Log

Do you miss our friend `console.log` from JavaScript? 😢

Well, miss it **no longer**! Now we can `console.log` in Solidity as well. 🎉
```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";

contract Contract {
    constructor(uint x, string y, bool z) {
        console.log(x); // 1
        console.log(y); // Hello World!
        console.log(z); // true
    }
}
```
This method can take an `uint`, `string`, `bool`, or `address` as its argument. It will log the results to the console on execution.

    🔍 There are a few more console methods available for other data types. Let's check them out in details.

## 🏁 Your Goal: Find the Secret!

There is a **secret unsigned integer** that will pass this stage. Your goal is to find what that secret is! 🔑

You can do so by logging the message passed to the constructor. Follow the message's instructions to pass the stage!

    📖 You'll notice the keyword memory on the string argument. This is the string's "data location". We talked about this concept in the Week 5 Reference Types section.

# 4. Evenly Divides
## Base Functions

We can create functions which serve a basic purpose and then re-use them in other library functions.

In this way we make it easier to **DRY** up our code.

    📖 As metioned in an earlier JavaScript lesson DRY stands for Don't Repeat Yourself, it's a great sofware practice and a huge motivation behind libraries.

## 🏁 Your Goal: Evenly Divides

Let's create a public pure function on the library `Prime` called `dividesEvenly`. This function should take two `uint` parameters and return a `bool`.

1. The function should determine if the second `uint` divides the first `uint` **evenly**. If it divides evenly the function should return `true`. If not, it should return `false`.

    💡 If an integer **evenly divides** the other, there should be **no remainder**. Remember that there's an operator that helps us determine the remainder after division, which we used in the first stage! 😉

Some examples:
```
console.log( dividesEvenly(4, 2) ); // true
console.log( dividesEvenly(5, 2) ); // false
console.log( dividesEvenly(6, 3) ); // true
console.log( dividesEvenly(6, 4) ); // false
```

# 5. Is Prime
## Building on Functions

It's quite easy to invoke another defined function within the library itself:
```
library UIntFunctions {
    function isEven(uint x) public pure returns(bool) {
        return x % 2 == 0;
    }
    function isOdd(uint x) public pure returns(bool) {
        return !isEven(x);
    } 
}
```
☝️ We're re-using the `UIntFunctions` library we made earlier. You can see we added an `isOdd` function that simply takes the result of `isEven` and flips it with the boolean NOT operator!
## 🏁 Your Goal: Is it Prime?

1. Create a function called `isPrime` that takes a `uint` parameter and returns a `bool` indicating if the number is a prime number.

    🔍 A prime number is a number that is only **evenly divisible** by `1` and itself. Let's talk algorithm strategy in details.

# 6. Next Prime
## Block Global

Among many global properties we can access inside Solidity is the `block`. The `block` will tell us information about the current block this transaction is being mined on:

  - **block.coinbase** - Theminer - of this block'saddress ⛏️
  - **block.difficulty** - - Thedifficulty of - thecurrent block 😓
  - **block.gaslimit** - Thetotal - gaslimit of theblock ⛽
  - **block.number** - Thecurrent - block number 1️⃣
  - **block.timestamp** - Thecurrent timestamp ofthe block (in secondssince unix epoch) 🕒

☝️ All of these are 256 bit unsigned integers with the exception of `coinbase` which is an address.

We can use these globals in contracts and libraries very simply:
```
import "hardhat/console.sol";
contract MyExample {
    constructor() {
        console.log( block.timestamp ); // 1583271154
        console.log( block.number ); // 9600665
    }
}
```
## 🏁 Your Goal: Prime Block Winner

You'll find the `PrimeGame` contract in the new file `PrimeGame.sol`. This file has already imported the `Prime` library for you.

1. In this contract, create a function called `isWinner` that determines if the current block number is prime.
  - If it is prime, return `true`. A winner! 🎉
  - If not, return `false`. 😢
