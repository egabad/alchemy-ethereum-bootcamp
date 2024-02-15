# Ready to be a winner?

You'll need to prove your smart contract skills to us. Don't worry, you totally got this! 💪
## 🏁 Your Goal: Emit the Winner event

Your goal is simple! Emit the winner event on this smart contract on the Goerli testnet: https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

If you take a look at the `Code` tab in Etherscan, you'll see that the source code for this contract looks like this:
```
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
```
How do we possibly make it so the `tx.origin` (the EOA who originated the transaction) is not equal to the `msg.sender`? 🤔

We'll leave that challenge up to you!
## Getting Setup

Need help getting setup with your Hardhat project? Here's a refresher from Dan on how to start a new hardhat project, deploy a contract and interact with it:

[video]

Helpful links:

- **Hardhat Overview** - https://hardhat.org/hardhat-runner/docs/getting-started#overview
- **NPM** - https://www.npmjs.com/
- **Alchemy** - https://www.alchemy.com/
- **Goerli Faucet** - https://goerlifaucet.com/

## The Leaderboard

Once you've completed the challenge you should find your address amongst the list of winners on the events tab. Check out how many other people have completed this challenge!
