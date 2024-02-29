# Contents
- [Contents](#contents)
- [1. Add Member](#1-add-member)
  - [Mapping](#mapping)
  - [🏁 Your Goal: Members Mapping](#-your-goal-members-mapping)
- [2. Is Member](#2-is-member)
  - [Mapping Retrieval](#mapping-retrieval)
  - [🏁 Your Goal: Is Member](#-your-goal-is-member)
- [3. Remove Member](#3-remove-member)
  - [Mapping Removal](#mapping-removal)
  - [🏁 Your Goal: Remove Member](#-your-goal-remove-member)
- [4. Map Structs](#4-map-structs)
  - [Mapping to Struct](#mapping-to-struct)
  - [🏁 Your Goal: User Mapping Tokens](#-your-goal-user-mapping-tokens)
  - [🔒 Contract Security](#-contract-security)
- [5. Map Structs 2](#5-map-structs-2)
  - [Types of Balances](#types-of-balances)
  - [🏁 Your Goal: Transfer Amount](#-your-goal-transfer-amount)
  - [🔒 Contract Security](#-contract-security-1)
- [6. Nested Maps](#6-nested-maps)
  - [Nested Mappings](#nested-mappings)
  - [🏁 Your Goal: Make Connections](#-your-goal-make-connections)

# 1. Add Member
## Mapping

Mappings allow you to store and retrieve elements quickly with a `key`. The key points to a location in memory where the `value` is stored.

The `key` can be any `value data type` in Solidity. It cannot be a `reference data type` like a struct or an array.

The `value`, on the other hand, can be any Solidity type. It can be a struct, an array or even another mapping!

Let's see an example of a mapping:
```
import "hardhat/console.sol";
contract Contract {
    // create a score state variable 
    // maps an address (key) to a uint (value)
    mapping(address => uint) public score;

    function addPoint() external {
        // we're using msg.sender as the key 
        // to look up the score in memory
        console.log(score[msg.sender]); // 0

        // we can also update that location in memory
        score[msg.sender]++;
        console.log(score[msg.sender]); // 1
    }
}
```
☝️ The variable `score` takes an `address` and maps it to a `uint`. Each address will be mapped to its own unique `uint` value that it can retrieve and modify.

The `addPoint` function uses the `msg.sender` as the key to update a location in memory. This location in memory for a value is **initialized at zero**. We can add to it using the `msg.sender` as the key, as shown above.

    💡 The score mapping is public which means that there will be a getter function created automatically. We can make a request to an Ethereum node invoking this getter function with an address and get a uint back.

## 🏁 Your Goal: Members Mapping

1. Create a public mapping called `members` which maps an `address` to a `bool`. The `bool` will indicate whether or not the address is currently a member!
2. Create an external function called `addMember` which takes an `address` and adds it as a member. You can do this by storing `true` in the data location corresponding to the address in the `members` mapping.

# 2. Is Member
## Mapping Retrieval

Compared to arrays retrieving a value from a mapping is quite simple!

Consider:
```
mapping(address => bool) students;

function isStudent(address addr) external view returns(bool) {
    return students[addr];
}
```
Versus:
```
address[] students;

function isStudent(address addr) external view returns(bool) {
    for(uint i = 0; i < students.length; i++) {
        if(students[i] === addr) {
            return true;
        }
    }
    return false;
}
```
☝️ To find if the student address is an array we have to **iterate** over the array. For the mapping we can simply plug in the address.

    ⛽ Choosing the right data structure is half the battle. It can help keep the code clean and use less gas!

    🔍 Curious how the value lookup for the mapping works under the hood? Let's take a look in details.

## 🏁 Your Goal: Is Member

Create an external, view function called `isMember` which takes an `address` and returns a `bool` indicating whether or not the `address` is a member.

# 3. Remove Member
## Mapping Removal

For arrays, removing elements can be an expensive operation, especially if you don't want to leave any gaps!

Let's say you had an array containing the unsigned integer values `[1,2,3]`. Removing the first element `1` would mean you would have to shift the values `2` and `3` down one position each. For a bigger array, this could mean many storage operations. Super expensive! 💰⛽

    💡 In this case you could use a Linked List where you can "stitch" the previous node to the next node instead of having to shift elements.

For mappings, removal is quite simple. For example, in this students mapping:
```
mapping(address => bool) students;

function removeStudent(address addr) external {
    students[addr] = false;
}
```
☝️ Simple code! We provide the address to find the memory location and set it to `false`.
## 🏁 Your Goal: Remove Member

Create an external function called `removeMember` that will take an `address` and set its corresponding value in the `members` mapping to `false`.

# 4. Map Structs
## Mapping to Struct

Here's where mappings get interesting! We can map to many different types. Let's start with structs:
```
contract Market {
    // create the Collectible struct
    struct Collectible {
        address owner;
        bool forSale;
        uint price;
    }

    // map a uint ID to a Collectible struct
    mapping(uint => Collectible) idToCollectible;

    function purchase(uint _id) external payable {
        // find the collectible by the id passed in
        Collectible storage collectible = idToCollectible[_id];
        // purchase the collectible
        require(msg.value >= collectible.price);
        collectible.owner = msg.sender;
        collectible.forSale = false;
    }
}
```
☝️ We are able to lookup the collectible using the `uint` id passed into `purchase`. Then we have access to the struct to sell it to its new owner.
## 🏁 Your Goal: User Mapping Tokens

Let's create a new token where every new user will receive 100 tokens!

1. Create a public mapping called `users` that will map an `address` to a `User` struct.
2. Create an external function called `createUser`. This function should create a new user and associate it to the `msg.sender` address in the `users` mapping.
3. The `balance` of the new user should be set to `100` and the `isActive` boolean should be set to `true`.

## 🔒 Contract Security

Ensure that the `createUser` function is called with an address that is not associated with an active user. Otherwise, revert the transaction.

# 5. Map Structs 2
## Types of Balances

Smart Contracts will often store balances for two different reasons:

1. **Ether Balance** - Keep track of the ether deposited by each user
2. **Token Balance** - Keep track of the amount of tokens held by each user

For ether, we use the native `value` on the message and the transaction. Sending `value` will update the user's account balance in the ethereum global state.

For tokens, we update a `balances` mapping. The smart contract is solely responsible for maintaining the user's balance.

In the smart contract you are building, you are maintaining your own balances in the `User` struct that has no relation to ether. To transfer balances from one user to another, you can just update the struct value! There is no need to send `value` over message call (i.e. using `<address>.call`).
## 🏁 Your Goal: Transfer Amount

1. Create an external function called `transfer` which takes two parameters: an `address` for the recipient and a `uint` for the amount.
2. In this function, transfer the `amount` specified from the balance of the `msg.sender` to the balance of the recipient `address`.

## 🔒 Contract Security

1. Ensure that both addresses used in the `transfer` function have active users.
2. Ensure that the `msg.sender` has enough in their `balance` to make the transfer without going into a negative balance.
3. If either of these conditions aren't satisfied, revert the transaction.

# 6. Nested Maps
## Nested Mappings

As shown in the previous stage, we can provide more complex types in our mapping values.

Last stage we showed it with structs, now let's try it with **other mappings**!
```
mapping(uint => mapping(address => bool)) voteToAddressChoice;

function getVote(uint _id, address _addr) 
    external
    view 
    returns(bool)
{
    return voteToAddressChoice[_id][_addr];
} 
```
☝️ In this scenario each **vote id** points to a **mapping of addresses to bool** votes. This allows each address to register a different vote with each vote id.

As a voter we might call a function with an id to register our choice:
```
function registerVote(uint _id, bool _choice) external {
    voteToAddressChoice[_id][msg.sender] = _choice;
}
```
Let's say there were 3 votes with the ids: `212`, `72` and `409`.

We could for make the following transactions from an EOA:
```
// for true for vote id 212
registerVote(212, true);
// for false for vote id 72
registerVote(72, false);
// for true for vote id 409
registerVote(409, true);
```
☝️ This would register a `true` for the ids `212` and `409` at our address. For `72` it would register `false`.

    📖 Of course, the default value for a bool is false, so this second vote may be pointless unless we were to add in some other way to provide an non-existent vote.

## 🏁 Your Goal: Make Connections

1. Create a public mapping called `connections` which will map an `address` to a mapping of an `address` to a `ConnectionTypes` enum value.
2. In the `connectWith` function, create a connection from the `msg.sender` to the `other` address.
3. 