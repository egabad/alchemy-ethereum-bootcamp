# Contents
- [Contents](#contents)
- [1. Storing Owner](#1-storing-owner)
  - [Solidity Addresses](#solidity-addresses)
  - [🏁 Your Goal: Store the Owner](#-your-goal-store-the-owner)
- [2. Receive Ether](#2-receive-ether)
  - [Receive Function](#receive-function)
  - [🏁 Your Goal: Receive Ether](#-your-goal-receive-ether)
- [3. Tip Owner](#3-tip-owner)
  - [Transferring Funds](#transferring-funds)
  - [🏁 Your Goal: Transfer Tips](#-your-goal-transfer-tips)
- [4. Charity](#4-charity)
  - [Contract Account](#contract-account)
  - [🏁 Your Goal: Charity Donation](#-your-goal-charity-donation)
- [5. Self Destruct](#5-self-destruct)
  - [Self Destruct](#self-destruct)
  - [🏁 Your Goal: Self Destruct](#-your-goal-self-destruct)

# 1. Storing Owner
## Solidity Addresses

Let's talk about the `address` data type in Solidity!

From our Ethereum lessons we know that an address on the EVM is a 160 bits long, or a 40 character, hexadecimal string:
```
address a = 0xc783df8a850f42e7f7e57013759c285caa701eb6;
```
☝️ This is valid Solidity! We can store a fixed address in our contracts if we need to.

We can also find the sender of the current message:
```
import "hardhat/console.sol";
contract Example {
    constructor() {
        console.log( msg.sender ); // 0xc783df8a850f42e7f7e57013759c285caa701eb6
    }
}
```
☝️ Here we are logging the address of the account calling this contract.

    🔍 What is msg? We'll take a closer look at Ethereum Messages in Details.

## 🏁 Your Goal: Store the Owner

1. Create a public `address` state variable called owner on the contract
2. Next create a constructor function which will store the `msg.sender` in `owner`

    📖 Since the constructor is only called once during contract deployment, storing the `owner` is not all too uncommon, especially if you need to have an administrative role. Of course, keep in mind that the administrative role can infringe on the decentralized nature of your contract!

# 2. Receive Ether
## Receive Function

In the latest versions of Solidity, contracts **cannot receive ether** by default.

In order to receive ether, a contract must specify a **payable** function. This is another keyword which affects the function's mutability similar to **view** and **pure**.

    📖 In fact, in the ABI, a function's stateMutability can be one of four values: view, pure, payable and nonpayable. The last one is the default, it is nonpayable when we don't specify the state mutability.

Let's see a payable function in action:
```
import "hardhat/console.sol";
contract Contract {
    function pay() public payable {
        console.log( msg.value ); // 100000
    }
}
```
☝️ Here the `msg.value` is the amount of ether sent to this function `pay` measured in Wei. Just by adding a `payable` keyword to this function we are able to accept ether. The ether is automatically stored in the contract's balance, no need to do anything else!

    💭 What if someone tried to send a payment to a nonpayable function? The transaction will fail, sending the ether back to the sender.

In the case above we used the method `pay` as a `payable` function. This means we have to call this function in order to send the ether to the contract. What if we wanted to send it directly without specifying a method?

Turns out, we can do that too:

import "hardhat/console.sol";
contract Contract {
    receive() external payable {
        console.log(msg.value); // 100000
    }
}

☝️ You'll notice that `receive` does not use the `function` keyword. This is because it is a *special* function (like `constructor`). It is the function that runs when a contract is sent ether without any **calldata**.

The receive function must be **external**, **payable**, it cannot receive arguments and it cannot return anything.

    🔍 Another option to receive ether without specifying a function signature on a contract is to use a payable fallback function.

## 🏁 Your Goal: Receive Ether

Add a function to the `contract` that will allow it to receive ether on a transaction without any **calldata**.

    👀 If you take a look at the test cases you'll notice that the method used is the web3 sendTransaction which is the same method used to send ether from one Externally Owned Account to another. No bytecode data required.

# 3. Tip Owner
## Transferring Funds

We can make any regular function **payable**. This allows us to differentiate the purpose of the ether coming into the smart contract.

Perhaps a contract has two addresses and we wanted to be able to pay one or the other:
```
contract Contract {
    address public a;
    address public b;
    
    constructor(address _a, address _b) {
        a = _a;
        b = _b;
    }

    function payA() public payable {
        (bool s, ) = a.call{ value: msg.value }("");
        require(s);
    }

    function payB() public payable {
        (bool s, ) = b.call{ value: msg.value }("");
        require(s);
    }
}
```
☝️ We have two pay methods `payA` and `payB` which will transfer ether to the respective address. It takes a uint amount of Wei and transfers it from the contract account to the address.
## 🏁 Your Goal: Transfer Tips

Let's create a way to tip the contract owner!

Create a public payable function `tip` which sends any of its received ether to the `owner`.

# 4. Charity
## Contract Account

Within contracts, the `this` keyword can explicitly converted to an address:
```
import "hardhat/console.sol";
contract Contract {
	constructor() {
		console.log( address(this) ); // 0x7c2c195cd6d34b8f845992d380aadb2730bb9c6f
		console.log( address(this).balance ); // 0
	}
}
```
☝️ Using `this` we can easily find the address and balance of the contract!

    🔍 Let's take a closer look at the Solidity keyword this in Details.

## 🏁 Your Goal: Charity Donation

Let's take all funds that were passed to the `receive` function and donate them to charity. We'll do this in two steps.

1. **First**, modify the `constructor` to accept a new argument: the charity address.
2. **Next**, add a new function called `donate`. When this function is called transfer all remaining funds in the contract to the charity address.

# 5. Self Destruct
## Self Destruct

Contracts can destroy themselves by using the `SELFDESTRUCT` opcode on the EVM!

This opcode actually **refunds ether** in order to incentivize folks to clean up the blockchain from unused contracts.

Let's see it in action:
```
contract Contract {
    uint _countdown = 10;

    constructor() payable { }

    function tick() public {
        _countdown--;
        if(_countdown == 0) {
            // NOTE: we must cast to payable here
            // some solidity methods protect 
            // against accidentally sending ether
            selfdestruct(payable(msg.sender));
        }
    }
}
```
☝️ After 10 calls to the `tick` function the `Contract` will `selfdestruct`! 💥

So you might be wondering, why did we provide the argument `msg.sender`? 🤔

The address provided to the `selfdestruct` function gets all of the ether remaining in the contract! Ether sent to the `payable` constructor will be refunded to the final caller of the `tick` function.

    🔍 Before self-destructing your smart contract you may want to consider the repercussions. Let's discuss this in details.

## 🏁 Your Goal: Self Destruct

When the `donate` function is called, trigger a `selfdestruct` in the contract!

    💡 The selfdestruct will send all remaining funds to the address passed in, so it might be a good candidate to replace the existing functionality in your donate function by sending the funds to the charity! Just be sure to cast the address to an address payable as shown in the example above.