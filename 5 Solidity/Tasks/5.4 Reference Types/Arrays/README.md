# Contents
- [Contents](#contents)
- [1. Fixed Sum](#1-fixed-sum)
  - [Fixed Arrays](#fixed-arrays)
  - [Retrieve Elements 🔎](#retrieve-elements-)
  - [For Loops 🌀](#for-loops-)
  - [🏁 Your Goal: Find the Sum](#-your-goal-find-the-sum)
- [2. Dynamic Sum](#2-dynamic-sum)
  - [Dynamically Sized Arrays](#dynamically-sized-arrays)
  - [🏁 Your Goal: Sum Dynamic Array](#-your-goal-sum-dynamic-array)
- [3. Filter to Storage](#3-filter-to-storage)
  - [Storage Arrays](#storage-arrays)
  - [🏁 Your Goal: Filter Even Numbers](#-your-goal-filter-even-numbers)
- [4. Filter to Memory](#4-filter-to-memory)
  - [Memory Arrays](#memory-arrays)
  - [🏁 Your Goal: Filter Even Numbers](#-your-goal-filter-even-numbers-1)
- [5. Stack Club 1](#5-stack-club-1)
  - [Stack Club](#stack-club)
  - [🏁 Your Goal: Add Members 👨👩](#-your-goal-add-members-)
- [6. Stack Club 2](#6-stack-club-2)
  - [Pop](#pop)
  - [🏁 Your Goal: Remove Members](#-your-goal-remove-members)
  - [🔒 Function Security](#-function-security)

# 1. Fixed Sum
## Fixed Arrays

Fixed sized arrays have a set amount of values at compile-time.

We can declare fixed size arrays in Solidity like so:
```
uint[3] x = [1,2,3];
address[1] y = [0xc783df8a850f42e7F7e57013759C285caa701eB6];
bool[4] z = [true, true, false, false];
```
☝️ These arrays have their size determined at compile-time. They cannot grow or shrink in size.

    📖 If you store less elements in the array than the fixed size, the rest of the elements will be the default value for the data type (i.e. false for bool and 0 for uint). If you store more elements in the array than the fixed size, you'll get a compile-time TypeError!

The above array declarations will work for state variables. Inside of a function, *however*, we will need to specify the data location of an array:
```
uint[3] memory numbers = [1, 2, 3];
```
☝️ The data location for this array is `memory`.

Memory is temporary, it will only last as long as the transaction. Other data locations include `calldata` for arguments and `storage` for persistence.

    🔍 Let's take a closer look at Data Location in details.

## Retrieve Elements 🔎

We can also retrieve elements from our array with numerical indexes:
```
uint[3] memory numbers = [1, 2, 3];

console.log(numbers[0]); // 1
console.log(numbers[1]); // 2
```
## For Loops 🌀

For loops in Solidity have similar syntax as JavaScript and other C-family languages:
```
for(uint i = 0; i < 10; i++) {
    // run statement
}
```
## 🏁 Your Goal: Find the Sum

1. Create a pure, external function `sum` which takes a fixed size array of **five unsigned integers**.
2. Find the sum of the unsigned integers and return it as a `uint`.

# 2. Dynamic Sum
## Dynamically Sized Arrays

We can also create arrays in Solidity where the size is unknown at compile-time. These arrays are said to have **dynamic size**.

For example:
```
import "hardhat/console.sol";
contract Contract {
    function logFriends(address[] calldata friends) external view {
        for(uint i = 0; i < friends.length; i++) {
            console.log(friends[i]);
        }
    }
}
```
☝️ Here we are able to log each address that is sent to the `logFriends` function.

We use the `length` member available on the array to determine the number of elements inside the dynamic sized array and then we use number indexes to retrieve the address.
## 🏁 Your Goal: Sum Dynamic Array

1. Create a pure, external function `sum` which takes a dynamic size array of unsigned integers.
2. Find the sum of the unsigned integers and return it as a `uint`.

# 3. Filter to Storage
## Storage Arrays

With arrays in storage you can use the `push` member function to add a new element at the end.
```
import "hardhat/console.sol";
contract Contract {
  uint[] public numbers;

    constructor() {
    numbers.push(3);
    console.log(numbers.length); // 1
    numbers.push(4);
    console.log(numbers.length); // 2
    console.log(numbers[0]); // 3
    console.log(numbers[1]); // 4
    }
}
```
☝️ As you might expect the `length` member adjusts when new elements are pushed onto the end of the array.
## 🏁 Your Goal: Filter Even Numbers

1. Create a public, dynamic sized array of unsigned integers as a state variable called `evenNumbers`.
2. Create an external function called `filterEven` which takes an dynamic size array of unsigned integers as its only argument. Find all of the even numbers in this array and push them into the `evenNumbers` storage array.

# 4. Filter to Memory
## Memory Arrays

Unlike storage arrays, memory arrays **do not** have a `push` member function.

Memory arrays can have a dynamic size *if* the size is provided during initialization.

For example:
```
import "hardhat/console.sol";
  ontract Contract {
    int x = 5;
    
  function createArray() view external {
    address[] memory addresses = new address[](x);
    console.log( addresses.length ); // 5
  }
}
```
☝️ The size is dynamically provided by the variable `x`. We could potentially change this variable and it would create an array of addresses of that size. Notice the use of the `new` operator here during initialization!

**After initialization**, memory arrays **cannot be resized**. This means even in the example above, once the `addresses` array is initialized at size `5`, it will stay that length for the entirety of the transaction.

    🔍 Let's take a look at an example where we filter any number over 5 in memory. You can find it on the details tab.

## 🏁 Your Goal: Filter Even Numbers

1. Create a pure, external function called `filterEven` which takes an dynamic size array of unsigned integers as its only argument.
2. Find all the even numbers and add them to a new array in memory. This array should **contain only** the even numbers.
3. Return this new array.

# 5. Stack Club 1
## Stack Club

This `StackClub` contract will have many members like a **club** or an organization would. We'll track these members by keeping a list of addresses.

Members will be added by pushing their address to the top of the list. Members will be removed by popping the most recent one off of the list. A Last-In-First-Out structure, just like a **stack**!
## 🏁 Your Goal: Add Members 👨👩

1. Create a dynamic sized array of addresses called `members`
2. Create an external function `addMember` which has a single parameter: an `address` for a new member.
3. Create a public view function `isMember` that takes an `address` and returns a `bool` indicating whether the `address` is a member or not.

# 6. Stack Club 2
## Pop

Storage arrays also have access the `pop` member variable:
```
import "hardhat/console.sol";
contract Contract {
  uint[] public numbers;

    constructor() {
    numbers.push(3);
    numbers.push(4);
    console.log(numbers.length); // 2
    numbers.pop();
    console.log(numbers.length); // 1
        console.log(numbers[0]); // 3
    }
}
```
☝️ As you can see, `pop` will take the top element off the storage array.
## 🏁 Your Goal: Remove Members

1. Create a constructor which will add the deployer address as the first member of the stack club.
2. Create a `removeLastMember` function which will remove the last member added to the club.

## 🔒 Function Security

1. Ensure that the `removeLastMember` function can only be called by an existing member
2. Ensure that `addMember` can only be called by an existing member
