# Contents
- [Contents](#contents)
- [1. Blocks and Hashes](#1-blocks-and-hashes)
  - [Blocks and Hashes](#blocks-and-hashes)
  - [Your Goal: Return a Hash](#your-goal-return-a-hash)
- [2. What's in a Hash?](#2-whats-in-a-hash)
  - [Adding Data to the Hash](#adding-data-to-the-hash)
  - [Your Goal: Hash the Data](#your-goal-hash-the-data)
- [3. The Genesis Block](#3-the-genesis-block)
  - [Blockchain Time](#blockchain-time)
  - [Your Goal: Add the Genesis Block](#your-goal-add-the-genesis-block)
- [4. Adding Blocks](#4-adding-blocks)
  - [Your Goal: Create an addBlock Function](#your-goal-create-an-addblock-function)
- [5. Linking the Blocks](#5-linking-the-blocks)
  - [Previous Hash](#previous-hash)
  - [Your Goal: Link Blocks](#your-goal-link-blocks)
- [6. Validating the Chain](#6-validating-the-chain)
  - [Chain Validation](#chain-validation)
  - [Your Goal: Create an isValid Function](#your-goal-create-an-isvalid-function)

# 1. Blocks and Hashes
## Blocks and Hashes

Blockchain is aptly named! It is, in fact, a **chain of blocks**.

Each block contains **transactional data**, some **metadata** describing the block itself, and a **link** to the previous block before it. These components are fed into a [hash function](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3afdd3d9f99763e5c4b502?tab=details&scroll=Hash%20Function) to create a unique sequence of bits to represent the block.
## Your Goal: Return a Hash

In your `Block.js` file, we have a class `Block`. Using the `SHA256` function from the [Crypto JS Library](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3afdd3d9f99763e5c4b502?tab=details&scroll=Crypto-JS), return a valid hash in the `toHash` function.

For now, there's no need to hash anything in particular since the block contains none of the components we mentioned above.

    Feel free to hash a message, your own name, or nothing at all! So long as it is a 64 character hexadecimal string you will pass this stage.

# 2. What's in a Hash?
## Adding Data to the Hash

Now it's time to add `data` to our hash. This will ensure that the block's hash is [tied to its contents](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3b0b26d9f99763e5c4b518?tab=details)!
## Your Goal: Hash the Data

When creating a new block, `data` will be passed to its constructor:

```js
const block = new Block("Alice sent Bob 1 BTC");

console.log( block.data ); // Alice sent Bob 1 BTC
```

As shown above, let's add a `data` property to the `Block`.

1. Add a constructor to our `Block` class that takes one argument data and assigns it to `this.data`
2. Once you have added data to the `block`, use this data to calculate the block's hash in the `toHash` function!

# 3. The Genesis Block
## Blockchain Time

We have a new file: `Blockchain.js`. How exciting!

This stage is going to focus on adding the first block to our new Blockchain class! The first block is often referred to as the [Genesis Block](https://university.alchemy.com/course/ethereum/sc/5b3afd70d9f99763e5c4b4fe/stage/5b3ba85bd9f997b30859bb70?tab=details).
## Your Goal: Add the Genesis Block

The `Blockchain.js` file contains the `Blockchain` class with a `chain` array. Let's add the **Genesis Block** to this array.

Create a `new Block` in the Blockchain constructor then add it to the `chain` array.

# 4. Adding Blocks
## Your Goal: Create an addBlock Function

Let's create an `addBlock` function on our `Blockchain` class.

This function should take in a new block and add it to the `chain` array:
```js
const blockchain = new Blockchain();
const block = new Block("Charlie sent Dave 2 BTC");

blockchain.addBlock(block);

console.log(blockchain.chain.length); // 2
```
Remember we should have both the genesis block **and** the new block now.

# 5. Linking the Blocks
## Previous Hash

It's time to add one more **crucial** input to our block's hash calculation: the **hash of the previous block** in the chain.

![Linking Blocks](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_800/v1580327751/Frame_1_86_vctqau.png)

This creates a chain where any change to the data of an earlier block will affect each subsequent block.

    Let's take a look at what a change would do in details.

## Your Goal: Link Blocks

To link the blocks you have to accomplish two things:

1. Add a `previousHash` property to each block. The value of this property should be the hash of the block **before it** in the chain.
2. Use this `previousHash` property in the calculation of the block's hash.

    💡 Hints

    - A good spot to add the `previousHash` property on the block would be in the `addBlock` function, where a block is placed on the chain.
    - So far, the `Block` class in your `Block.js` file does not yet contain a `previousHash` property and currently only hashes `this.data` of a block - you must also include the block's `this.previousHash` property in the `toHash` function!
    - You can add multiple inputs to the SHA256 function by using the + operator, for example:
        ```js
        const hash = SHA256("dog" + "cat); // hash of dog and cat together
        ```
# 6. Validating the Chain
## Chain Validation

Blockchains are run by a network of computers. When a computer finds a new block, it broadcasts its new version of the blockchain to all of its peers. There may be multiple versions of the blockchain at any given time. However, the **longest valid blockchain** is the accepted one.

    Let's take a closer look at the logic behind this in details.

## Your Goal: Create an isValid Function

1. Create a function called `isValid` on our `Blockchain` that will return `true` or `false` if a block is valid or invalid respectively
2. `isValid` should check the integrity of every block in its chain by looking at each block's `previousHash` field and making sure that it is equal to the hash of the block before it

💡 Hint

    To compare the output of the SHA256 function you will need to convert it into a string (.toString) before comparing. Example:
```js
const hash1 = SHA256("a");
const hash2 = SHA256("a");

console.log(hash1 === hash2); // false
console.log(hash1.toString() === hash2.toString()); // true
```
    Notice that first one is false! These two are objects and are compared by reference which is why we need to convert it to a string!
