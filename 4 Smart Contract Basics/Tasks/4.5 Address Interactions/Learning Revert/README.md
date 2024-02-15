# Contents
- [Contents](#contents)
- [1. Constructor Revert](#1-constructor-revert)
  - [Reverting Transactions](#reverting-transactions)
  - [🏁 Your Goal: Require 1 Ether Deposit](#-your-goal-require-1-ether-deposit)
- [2. Only Owner](#2-only-owner)
  - [Restricting by Address](#restricting-by-address)
  - [🏁 Your Goal: Owner Withdrawal](#-your-goal-owner-withdrawal)
- [3. Owner Modifier](#3-owner-modifier)
  - [Function Modifiers](#function-modifiers)
  - [🏁 Your Goal: Require Owner](#-your-goal-require-owner)

# 1. Constructor Revert
## Reverting Transactions

In the EVM the main opcode to revert a transaction is `REVERT`. There are three ways to invoke the `REVERT` opcode from Solidity are `assert`, `require` and `revert`, but let's ignore `assert` for now (see this stage's details section for more on `assert`).

We can **revert** a transaction in Solidity by using the `require` function and the `revert` statement.

A `require` statement has two forms:
```
require(someBooleanCondition);
```
and
```
require(someBooleanCondition, "Optional error message");
```
☝️ These will revert if `someBooleanCondition` is false. We can use these to check for all kinds of conditions.

A `revert` provides the same access to the `REVERT` opcode without a condition.
```
if(!someBooleanCondition) {
    revert SomeCustomError(errorArg1, errorArg2, ...);
}
```
Note that as of Solidity `^0.8.0`, `revert` is a *statement* and **NOT** a *function*. However, for backward compatibility reasons, `revert` can still be used in function form. So `revert` can also be used like:
```
if(!someBooleanCondition) {
    revert("Some error message");
}
```
☝️ In both of the `revert` usages above, we check the boolean condition ourselves. If the condition is unexpected, we can call `revert` with a custom error or a string describing the reason for the error.
## 🏁 Your Goal: Require 1 Ether Deposit

Add a payable constructor method that requires a 1 ether deposit.

If *at least* 1 ether is not sent to the constructor, revert the transaction.

    📖 There are globally available ether units such as ether that you can use instead of having to convert from Wei (1 ether == 1e18). See Ether Units.

# 2. Only Owner
## Restricting by Address

We can provide certain roles to an address.

For instance, let's say we had an address that could create new game items:
```
error NotItemCreator();

contract Game {
    address itemCreator = 0xc783df8a850f42e7f7e57013759c285caa701eb6;

    function createItem() public {
        if(msg.sender != itemCreator) {
            revert NotItemCreator();
        }
        // TODO: create the item!
    }
}
```
☝️ This function `createItem` may be public, but there's only one address that can call it without the transaction reverting!
## 🏁 Your Goal: Owner Withdrawal

1. Create a public function `withdraw` that will withdraw all funds from the contract and send them to the deployer of the contract.
2. Require that only the deployer of the contract be allowed to call this function. For all other addresses, this function should revert.

    💡 The deployer of the contract is `msg.sender` of the constructor.

# 3. Owner Modifier
## Function Modifiers

We can write **modifiers** on functions to run logic before and after the function body.

Let's see an example:
```
import "hardhat/console.sol";
contract Example {
    function logMessage() public view logModifier {
        console.log("during");
    }

    modifier logModifier {
        console.log("before");
        _;
        console.log("after");
    }
}
```
☝️ Let's say we called `logMessage`, what would you expect the order of the logged messages to be? 🤔

It would be:
```
before
during 
after
```
Why? 🤨

Notice that the `logMessage` function signature is decorated with the `logModifier` modifier.

This modifier can add behavior to the function before and after the function body runs. The `_` in the `modifier` body is where the function body of the modified function will run.
## 🏁 Your Goal: Require Owner

You'll notice that the `onlyOwner` modifier has been added to each of the configuration functions in this contract. Only problem is, it doesn't currently do anything!

Update the `onlyOwner` modifier to require that **only the owner address** can call these functions without reverting.

    💡 Remember to use the _ to indicate where the function body should go!
