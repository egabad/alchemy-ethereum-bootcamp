# Contents
- [Contents](#contents)
- [1. Arguments](#1-arguments)
  - [Solidity Arguments](#solidity-arguments)
  - [🏁 Your Goal: Unsigned Int Constructor](#-your-goal-unsigned-int-constructor)
- [2. Increment](#2-increment)
  - [Contract Functions](#contract-functions)
  - [🏁 Your Goal: Increment x](#-your-goal-increment-x)
- [3. View Addition](#3-view-addition)
  - [Returning Values](#returning-values)
  - [🏁 Your Goal: Add Uint](#-your-goal-add-uint)
- [4. Pure Double](#4-pure-double)
  - [Pure Functions](#pure-functions)
  - [🏁 Your Goal: Double Uint](#-your-goal-double-uint)
- [5. Double Overload](#5-double-overload)
  - [Overloading Functions](#overloading-functions)
  - [🏁 Your Goal: Overload Double](#-your-goal-overload-double)

# 1. Arguments
## Solidity Arguments

The first function we'll talk about is the **constructor**:
```
bool public isOpen;

constructor() {
    isOpen = true;
}
```
☝️ Here we are setting the value of a state variable upon the contract's deployment.

    📖 The constructor for Solidity contracts is quite similar to the constructor in classes of many object-oriented languages. The constructor function is invoked only once during the contract's deployment and never again. It is generally used for setting up initial contract values.

What if we wanted to let the deployer of the contract decide the value of `isOpen`? 🤔

We can **pass an argument** to our constructor! Let's see that in action:
```
bool public isOpen;

constructor(bool _isOpen) {
    isOpen = _isOpen;
}
```
☝️ Check it out! Now the contract deployer can decide the value of `isOpen`.

    🔍 Notice how the parameter name (_isOpen) has an underscore in front of it? This prevents the variable from having the same name as the state variable. When the names collide it is referred to as variable shadowing. It can happen in Solidity quite often since we can refer to state variables without using this. Let's explore this further in details.

## 🏁 Your Goal: Unsigned Int Constructor

1. Create a constructor which will take a `uint` as an argument.
2. Store this `uint` value inside a public state variable called `x`.

# 2. Increment
## Contract Functions

Besides the constructor, contracts can define other functions which can be invoked by **transactions** or as **queries**.

    🔍 Let's explore the differences of **transactions** and **queries** in details.

The function syntax for Solidity looks quite familiar, coming from JavaScript! Let's see an example:
```
function myFunction() external {
    // do something!
}
```
☝️ Without the **external** visibility specifier here, this *could* be JavaScript code! The Solidity function syntax looks much the same aside from the keywords defining the function.

    📖 External visibility is quite similar to the public visibility for functions. External is better than public if you know that you are only calling the function externally (outside the EVM). Public visibility requires more gas because it can be called externally and internally, which complicates the assembly code.

## 🏁 Your Goal: Increment x

Let's build on your code from the previous stage!

1. Create an external function called increment that will add `1` to the state variable `x`.

    📖 Many of the shorthand operators we've become accustomed to in languages like JavaScript will also available in Solidity: `-=,` `*=,` `/=,` `%=,` `|=,` `&=,` `^=,` `++` and `--`.

# 3. View Addition
## Returning Values

It's time to learn how to `return` values from Solidity functions!

    🔍 Returning values in Soldiity is only useful for internal functions and blockchain queries. See why in details.

Let's see an example:
```
// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Contract {
	bool _isRunning = true;

	function isRunning() external view returns(bool) {
		// return the state variable
		return _isRunning;
	}
}
```
☝️ The `isRunning()` function indicates it is returning a boolean data type within the function signature: `returns(bool)`. Once declared, we can use the `return` keyword to return a boolean value within this function.

    💡 The `returns` declaration not only helps the compiler check for compile-time errors in our code, it also is how it generates the ABI. This helps external programs communicate with our Solidity contract! 👨‍💻👩‍💻

Adding the **view** keyword to the `isRunning` function signature guarantees it **will not modify** state variables. You can think of view functions as **read-only**; they can read the state of the contract but they cannot modify it.
## 🏁 Your Goal: Add Uint

1. Create an external view function `add` which takes a `uint` parameter and returns the sum of the parameter plus the state variable `x`.

    ⚠️ This function should **not modify state**. In fact, if it's labeled as a **view** it **cannot** modify state.

# 4. Pure Double
## Pure Functions

Occasionally there is the necessity for Solidity functions that neither read from nor write to state. These functions can be labeled as **pure**.

Let's say we wanted to add together two uint values:
```
function double(uint x, uint y) external pure returns(uint) {
    return x + y;
}
```
☝️ This function is just performing simple arithmetic without reading/writing state so we can label it **pure**.

    ⚠️ If we tried attempted to modify state in a pure function the compiler would throw an error along the lines of "Function declared as pure, but this expression (potentially) modifies the state".

There's also an alternative syntax for returning values in Solidity:
```
function double(uint x, uint y) external pure returns(uint sum) {
    sum = x + y;
}
```
☝️ Woah, that's new. 😲

In the `returns` keyword we specified the name of the returned parameter `sum`. Then we assigned the `x + y` to `sum` inside our function body. The value of `sum` is implicitly returned.

    ✅ A bit of a change-up from what we're used to from JavaScript! This return style is perfectly valid Solidity and quite often used.

## 🏁 Your Goal: Double Uint

1. Create an external, pure function called double which takes a `uint` parameter and doubles it. It should return this doubled `uint` value.

# 5. Double Overload
## Overloading Functions

In Solidity it is perfectly valid to declare two functions with the same name if they have different parameters:
```
function add(uint x, uint y) external pure returns(uint) {
    return x + y;
}
function add(uint x, uint y, uint z) external pure returns(uint) {
    return x + y + z;
}
```
☝️ Solidity will call the function signatures that matches the arguments provided. For example, `add(2,4)` will invoke the first funciton while `add(2,3,4)` will invoke the second function.

Also, Solidity can return multiple values from functions:
```
function addTwo(uint x, uint y) external pure returns(uint, uint) {
    return (x + 2, y + 2);
}
```
☝️ Notice that the `returns` keyword specifies two return values. Also we are wrapping the values in a parenthesis in order to return multiple values. This is referred to as a **tuple**.

    📖 Tuples are not a formal type in Solidity. They are a list of values that can be used as a temporary structure to return values or do assignment destructuring. The data types in tuples can be mixed.

We can also use tuples in assignment destructuring. Let's invoke the function `addTwo` which we just defined above:
```
(uint x, uint y) = addTwo(4, 8);
console.log(x); // 6
console.log(y); // 10
```
## 🏁 Your Goal: Overload Double

1. Create another pure external/public function `double` which takes two `uint` parameters.
2. Double both of the arguments and return both of them in the same order they were passed into the function.

    💡 For this solution, it is possible to use the `double` function from the previous stage in this solution. You may need to change the visibility from `external` to `public` so that you can call it internally as well.
