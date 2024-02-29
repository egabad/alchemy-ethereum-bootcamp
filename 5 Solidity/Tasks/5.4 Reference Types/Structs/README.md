# Contents
- [Contents](#contents)
- [1. Vote Storage](#1-vote-storage)
  - [Structs](#structs)
  - [🏁 Your Goal: Create a Vote](#-your-goal-create-a-vote)
- [2. Vote Memory](#2-vote-memory)
  - [Structs in Calldata \& Memory](#structs-in-calldata--memory)
  - [🏁 Your Goal: Return Memory Vote](#-your-goal-return-memory-vote)
- [3. Vote Array](#3-vote-array)
  - [Struct Arrays](#struct-arrays)
  - [🏁 Your Goal: Vote Array](#-your-goal-vote-array)
- [4. Choice Lookup](#4-choice-lookup)
  - [🏁 Your Goal: Find Vote](#-your-goal-find-vote)
- [5. Single Vote](#5-single-vote)
  - [🏁 Your Goal: Vote Once](#-your-goal-vote-once)
- [6. Change Vote](#6-change-vote)
  - [🏁 Your Goal: Change Vote](#-your-goal-change-vote)

# 1. Vote Storage
## Structs

With structs we can create custom types in Solidity that are essentially groupings of variables.

For instance:
```
enum Directions { Up, Down, Left, Right }

struct Hero {
    Directions facing;
    uint health;
    bool inAir;
}
```
☝️ With this struct we can create new heroes which contain just these three properties.

We can create a new Hero by invoking the struct with parenthesis:
```
Hero hero = Hero(Directions.Up, 100, true);
```
Then we can use the `.` operator to retrieve values from the hero:
```
console.log(hero.facing == Directions.Up); // true
console.log(health); // 100
console.log(inAir); // true
```
    🔍 Notice that the order of the parameters matters when creating a new struct, we could have also named the properties instead.

## 🏁 Your Goal: Create a Vote

1. Create a new struct called `Vote` that contains two properties: a `Choices choice` and an `address voter`.
2. Then create a public state variable called `vote` which is of the `Vote` type.
3. Finally, in the `createVote` function create a new instance of `Vote` and store it in the state variable `vote`. Use the `choice` passed in as an argument and the `msg.sender` for the vote properties.

# 2. Vote Memory
## Structs in Calldata & Memory

Traditionally structs were not handled by the ABI. More recently, the `ABIEncoderV2` has been added which will allow us to pass structs as calldata and return them in external functions! 🎉

To use the `ABIEncoderV2` we need to use a new pragma statement:
```
pragma experimental ABIEncoderV2;
```
☝️ With this pragma statement at the top of our code, we can use **tuples** in our ABI to describe structs.

    📖 Recall that tuples are temporary groupings of potentially dissimilar data types used for destructuring and returning multiple function parameters.

    ⚠️ Despite the experimental keyword, the ABIEncoverV2 is no longer considered experimental by the Solidity team as of Solidity v0.6.0. In other words, it is now considered safe for production use.

This encoder will allow us to take struct arguments and return structs externally:
```
struct Hero { uint health }

function postHero(Hero hero) external {
    // take a Hero type as an external argument
    console.log(hero.health); // 100
}

function getHero() external view returns (Hero memory) {
    // return Hero in an external function
    return Hero(100);
}
```
    🔍 Let's see what the ABI for a struct would look like on the Details Tab.

## 🏁 Your Goal: Return Memory Vote

1. Create an external, view function called `createVote` which takes `Choices` value as a parameter and returns an instance of type `Vote`.
2. This function should use the `Choices` value and the `msg.sender` as the values to create the vote.

# 3. Vote Array
## Struct Arrays

We can create an array of struct types, just like we would with any other data type!
```
// a dynamic size list of uints
uint[] numbers;

struct Account {
    uint id;
    uint balance;
}
// a dynamic size list of Accounts
Account[] accounts;
```
We can also push and retrieve accounts like any other storage array:
```
accounts.push(Account(0, 100));

console.log(accounts[0].id); // 0
console.log(accounts[0].balance); // 100
```
☝️ Of course, `push` only works on `storage` arrays, as we learned in the lesson on arrays!
## 🏁 Your Goal: Vote Array

1. Create a public state array of the `Vote` data type called `votes`.
2. In the `createVote` function use the `choice` parameter and the `msg.sender` to create a new vote and push it onto the array of votes.

# 4. Choice Lookup
## 🏁 Your Goal: Find Vote

1. Create an external, view function `hasVoted` which takes an `address` and returns a `bool` indicating if the address has cast a vote or not.
2. Create an external, view function `findChoice` which takes an `address` and returns a `Choices` value indicating the choice on the vote cast by the address. For this function there is no need to worry about the case where a vote was not cast.

    🔍 Interested in reducing your code? These functions can share a common function. It's a bit of a challenge, let's strategize in details.

# 5. Single Vote
## 🏁 Your Goal: Vote Once

1. Each address should only be allowed to call `createVote` **once**.
2. If they try again, **the transaction should be reverted**. 🔒

    💡 Remember that **external** functions can be changed to **public** if you'd like to use them internally as well! 🙂
# 6. Change Vote
## 🏁 Your Goal: Change Vote

1. Create an external function called `changeVote` which takes a `Choices` argument and changes the choice on the existing vote for the `msg.sender`.
2. If they do not have an existing vote, **revert the transaction**. 🔒
