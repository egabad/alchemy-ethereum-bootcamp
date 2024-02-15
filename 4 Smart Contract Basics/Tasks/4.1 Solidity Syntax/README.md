# Contents
- [Contents](#contents)
- [1. Booleans](#1-booleans)
  - [State Variables](#state-variables)
  - [🏁 Your Goal: Add two boolean variables](#-your-goal-add-two-boolean-variables)
- [2. Unsigned Integers](#2-unsigned-integers)
  - [Unsigned Integers](#unsigned-integers)
  - [🏁 Your Goal: Create Unsigned Integers!](#-your-goal-create-unsigned-integers)
- [3. Signed Integers](#3-signed-integers)
  - [Signed Integers](#signed-integers)
  - [🏁 Your Goal: Create Signed Integers!](#-your-goal-create-signed-integers)
- [4. String Literals](#4-string-literals)
  - [String Literals](#string-literals)
  - [🏁 Your Goal: Hello World 👋](#-your-goal-hello-world-)
- [5. Enum](#5-enum)
  - [Enum Type](#enum-type)
  - [🏁 Your Goal: Make Some Food!](#-your-goal-make-some-food)


# 1. Booleans
## State Variables

Let's get started by writing some **state variables**! **State Variables** are stored in the contract's persistent memory. Modifying a state variable in one transaction will change its value for anyone who tries to read the variable afterwards.

In Solidity, declaring a state variable is as simple as declaring the variable inside of the contract:

```
contract Contract {
	bool myVariable;
}
```

The `Contract` now has a boolean state variable called myVariable! Sweet. 😁

    💭 What is the value of myVariable at this point? Data Types in Solidity have default values, for booleans it is false. So, after deploying this contract, myVariable would be false.

Now we're going to do two things to our variable: **make it public** *and* **give it an initial value of** `true`:

```
contract Contract {
	bool public myVariable = true;
}
```

☝️ See how we added the keyword `public` here? This automatically creates a **getter** function for the variable.

Now we can access the value in `myVariable` by calling a function on the contract with that very name: `myVariable()`.

## 🏁 Your Goal: Add two boolean variables

1. Create two public boolean state variables on the contract: `a` and `b`.
2. Store `true` in the variable `a` and `false` in the value `b`.

    🔍 You'll see the **checkmarks** appear on your ABI Validations tab when you have successfully made two public variables `a` and `b`. Learn more about ABI Validations in details.

# 2. Unsigned Integers
## Unsigned Integers

What the heck is an *unsigned* integer? 🤨

First, let's go over integers. Integers include all positive and negative numbers without fractions. The numbers `-2`,`-1`,`0`,`1`,`2` are all integers. This range continues in both the positive and negative direction as far as you can count!

To determine if the number is above or below zero we use the **sign**: `+` or `-`. An **unsigned integer** is an integer that has **no sign**. 😲

Solidity has a specific data type for unsigned integers called `uint`. A `uint` can be suffixed with the number of bits reserved for it. For instance `uint8` means that there are **eight bits** provided for the value of the variable.

What is the range of unsigned integers in **eight bits**? 🤔

Eight bits can range from `00000000` to `11111111`. This range can represent **256** unique values.

Since the range of unsigned integer values does not include negative numbers, it is simply `0` to `255`. In decimal, the unsigned value of `00000000` is `0` and the value of `11111111` is `255`.

    🔍 Wondering what happens if we add two uint8 values together whose sum will exceed 255? Let's take a look at this in details.

## 🏁 Your Goal: Create Unsigned Integers!

Let's create three public state unsigned integers in our Contract: `a`, `b`, and `sum`.

1. Define the variable `a` as an `uint8` with an initial value between `0` and `255`.

    💡 If you declare the variable `a` as a `uint8` you will actually be unable to store a value outside the range `0` to `255`. If you try this directly in your program, you'll get a comrpile-time error!

2. Define the variable `b` as an `uint16` with a value of **at least** 256. The range for a `uint16` is `0` to `65535`.

3. The variable `sum` should be a `uint256` with the sum of the values stored in `a` and `b`.

    🔍 It's perfectly valid to add a `uint8` and a `uint16` and store them in a `uint256`. Mix it up!

In Solidity we can use the same math operators we've become familiar with from JavaScript `+`, `-`, `*`, `/`. `%` and `**`.

    ✅ You can use uint256 or uint to declare the sum. The keyword uint is an alias for uint256 and it is often used!

# 3. Signed Integers
## Signed Integers

Now that we know what an **unsigned** integer is, let's take a look at a **signed** integer.

A signed integer can be declared with the keyword `int`. Just like `uint`, the keyword `int` is short for a data type that will store 256 bits of memory, `int256`.

Since a integer is signed, the range covers **both negative and positive numbers**. Let's compare the range of a `uint8` to an `int8`:

- `uint8`: Ranges from `0` to `255`
- `int8`: Ranges from `-128` to `127`

☝️ Notice that both ranges cover a total of 256 values, which is the total number of possible values that can be expressed with 8 bits.
## 🏁 Your Goal: Create Signed Integers!

1. Create three public state integers `a`, `b`, and `difference`.

2. Declare the variables `a` and `b` as `int8`. One of the values must be **positive**, the other must be **negative**.

3. Declare the variable `difference` as a `int16` which is the **absolute difference** between `a` and `b`.

    💡 You can get the absolute difference simply by subtracting the negative number from the positive number. For instance, for the values `10` and `-15`, the absolute difference would be `25` which is `10 - -15`.

# 4. String Literals
## String Literals

We can create strings of characters using double quotes just like in JavaScript: the **string literal** `"Hello World"` is perfectly valid in Solidity.

    📖 You'll often see fixed values described as a literal. The value "Hello World" can be described as a string literal which differentiates it from the string data type. Any fixed value could be a literal, "Hello World", 42, or true.

A string literal can be stored in both the `bytes` and string `types`:
```
bytes msg1 = "Hello World"; 
string msg2 = "Hello World";
```
☝️ For a **long** human-readable message it is recommended to use `string` since it will be easier to read the values from the blockchain storage from the outside (like for a front-end application).

If the string is **shorter than 32 bytes**, it is more efficient to store it in a fixed-size byte array like `bytes32`. This simplifies the computation since the memory is allocated ahead of time. On the other hand, both `string` and `bytes` will allocate their memory dynamically depending on the size of the string.

How many characters can be stored in `bytes32`? 🤔

Well this is actually depends on the characters themselves! Many characters in UTF-8 encoding can be represented with 1 byte while others are represented with several bytes. For instance `c` is encoded by `0x63`, while `ć` is encoded by `0xc487`.

So the maximum values would be:
```
bytes32 msg1 = "cccccccccccccccccccccccccccccccc"; 
bytes32 msg2 = "ćććććććććććććććć"; 
```
☝️ Adding a character to either string will result in a compile-time error since the string literal would no longer fit into 32 bytes.

    💡 Quite often long strings are stored seperately on other distributed services like IPFS, with a hash representation stored on the blockchain (since storage on a blockchain is expensive!). For example, you could write a legal document and hash the contents along with digital signatures to prove that it was signed. As long as the original document is preserved it can be easily proven that it was signed by rehashing the contents.

## 🏁 Your Goal: Hello World 👋

It's time to do **Hello World** in Solidity! 😃

1. Create a `public bytes32` state variable `msg1` which stores a string literal containing "Hello World".

    🎨 Feel free to change the casing and add any other characters into `msg1` as long as it still contains the message "hello world".

2. Create a public string state variable msg2 which stores a string literal that requires over 32 bytes to store.

# 5. Enum
## Enum Type

The Enum Type helps us write clean code! 🚿

Consider this example:
```
if(player.movement == 0) {
    // player is moving up
}
else if(player.movement == 1) {
    // player is moving left
}
```
☝️ Those comments are *helpful*, but they aren't exactly a **foolproof** plan! The `movement` number is being generated somewhere else in the code. If that ever changed, it would break our code! 🐛

Plus, without the comments, there would be no way to tell which direction is which! 😱

An `enum` can clean this up! Let's see:
```
enum Directions = { Up, Left, Down, Right }
if(player.movement == Directions.Up) {

}
else if(player.movement == Directions.Left) {
    
}
```
😌 Much cleaner! 🧘

Not only are the numbers replaced with clear directions, we also have a structure for defining all our directions. We can share this structure, `Directions`, with other contracts to ensure that if the numbers change they won't break the rest of the code!

    📖 Underneath the hood, enum values are stored as unsigned integers. If there are less than 256 values, it will be stored as a uint8. If you have more than 256 values it will use a uint16 and will grow from there as needed (although I'm not sure how many contracts will ever need more than 65536 values in their enum...). The way this data is stored will become more important when we look to parse our smart contracts from the outside world through the ABI.

## 🏁 Your Goal: Make Some Food!

In the `enum` provided you'll see there are four types of Foods! 🍎🍌🍕🥯

Take the values and store them in `food1`, `food2`, `food3`, and `food4`!

    🎨 Feel free to pick your own favorite foods and add them to the list and food values as well!
