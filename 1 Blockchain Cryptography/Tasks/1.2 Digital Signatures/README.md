# Contents
- [Contents](#contents)
- [1. Hash Message](#1-hash-message)
  - [Hashing Messages](#hashing-messages)
  - [Your Goal: Hash the Message](#your-goal-hash-the-message)
- [2. Sign Message](#2-sign-message)
  - [Signing the Hash](#signing-the-hash)
  - [Your Goal: Sign Message](#your-goal-sign-message)
- [3. Recover Key](#3-recover-key)
  - [Recover the Public Key](#recover-the-public-key)
  - [Your Goal: Recover the Key](#your-goal-recover-the-key)
- [4. Key to Address](#4-key-to-address)
  - [Public Key to Address](#public-key-to-address)
  - [Your Goal: Get Ethereum Address](#your-goal-get-ethereum-address)

# 1. Hash Message

## Hashing Messages

The first step in ECDSA is to hash the message before applying the signature algorithm. So if you wanted to sign a message with one your keypairs saying that you "Vote Yes on Proposal 327", the first step would be to hash this message:
```js
// turn this into an array of bytes, the expected format for the hash algorithm
const bytes = utf8ToBytes("Vote Yes on Proposal 327");
// hash the message using keccak256
const hash = keccak256(bytes); 

console.log(toHex(hash)); // 928c3f25193b338b89d5646bebbfa2436c5daa1d189f9c565079dcae379a43be
```
After we have the message hash we can sign it with our private key to prove that a particular address votes yes on proposal 327. You may have found yourself doing something similar if you have ever signed a message in web3. When you send a transaction to a blockchain you also sign a hashed representation of that transaction before sending it to a blockchain node.
## Your Goal: Hash the Message

The noble-secp256k1 library (v 1.7.1) provides us with all of the cryptography we're going to need throughout this course. Let's make use of the keccak256 hash and utf8ToBytes function.

    Please note, this tutorial will require functions documented in release version 1.7.1 of the noble-secp256k1 library. Any further links in this tutorial will link directly to version 1.7.1 of the noble-secp256k1 documentation.

    Your first step is to take the string message passed in and turn it into an array of UTF-8 bytes. You can do so with the utf8ToBytes function.
    Then take the keccak256 hash of those bytes and return this value.

# 2. Sign Message

## Signing the Hash

It's time to sign a message using our private key to prove our intention!

When signing a message with secp256k1 we can return the signature along with the [recovery bit](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages#ecdsa-public-key-recovery-from-signature), allowing us to recover the public key from the signature. This will allow a blockchain node to take a signature of a transaction and understand which address authenticated this particular transaction.

    This is an important point, a blockchain transaction not only indicates the intent of the person who signed it, it also authenticates them through public key cryptography! We'll see this more clearly when start signing transactions in future lessons.

## Your Goal: Sign Message

Let's sign a message!

1. First step is to hash it using the hashMessage function you created in the last stage (we've already imported it for you on line 2)
2. Once you have the message hash, use the sign method from the [noble-secp256k1 library](https://github.com/paulmillr/noble-secp256k1/tree/1.7.1#signmsghash-privatekey).

        Note

        The sign method will take your message hash along with the constant PRIVATE_KEY declared at the top of the file. This private key is a valid key that could be used to authorize blockchain transactions. Never use this specific key because it is published on the internet, so many people including yourself could authenticate with this specific private key. In future lessons we'll be discussing good private key hygiene to avoid losing funds.

3. The sign method takes an optional third parameter called options, which you'll see in the documentation. Use this parameter to return the recovered bit so that the public key can be recovered from this signature.

        Take a look in the details tab if you need a hint!

# 3. Recover Key

## Recover the Public Key

When the signature is passed with all of its components (recovery bit included), the public key can be recovered. This means that blockchain nodes will be able to understand who signed the transaction that was sent to them. A transaction could indicate the user would like to send 1 ether to another address and provide a certain transaction fee. Since the signature signs the hash containing this intention, it is enough to authenticate this action entirely.
## Your Goal: Recover the Key

    Given a `message`, `signature`, and `recoveryBit` find the public key and return it! Be sure to hash the message when passing it to the recovery method.

Use the [noble-secp256k1](https://github.com/paulmillr/noble-secp256k1/tree/1.7.1) library documentation to find the correct method and parameters for this one.

    Remember to check version 1.7.1 of the library's documentation!

# 4. Key to Address

## Public Key to Address

Bitcoin and Ethereum both have a transformation process to take a public key and turn it into an address. For Bitcoin it includes [a checksum and Base58 encoding](https://en.bitcoin.it/wiki/Technical_background_of_version_1_Bitcoin_addresses). Ethereum's address transformation is quite a bit simpler, its address is the last 20 bytes of the hash of the public key.

The important thing to recognize here is that the address is differentiated from the public key, but you can always derive the address if you have the public key.
## Your Goal: Get Ethereum Address

Let's get the ethereum address from the public key!

1. First step, you'll need to take the first byte off the public key. The first byte indicates the format of the key, whether it is in the compressed format or not. The publicKey will be a `Uint8Array` so you can use the [slice method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice) to slice off the first byte.
2. Next, take the `keccak` hash of the rest of the public key.
3. Finally, take the last 20 bytes of the keccak hash and return this. Once again, you can make use of the [slice method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice).
