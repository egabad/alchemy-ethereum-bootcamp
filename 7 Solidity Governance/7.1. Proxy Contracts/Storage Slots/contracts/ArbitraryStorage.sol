// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./StorageSlot.sol";
import "hardhat/console.sol";

contract ArbitraryStorage {
  constructor() {
    // all storage slots in the EVM are 32 bytes
    // input arbitrary slot (keccack256(x))
    StorageSlot.getUint256Slot(keccak256("Hello World!")).value = 258;
  }

  function check() external view {
    console.log(StorageSlot.getUint256Slot(keccak256("Hello World!")).value);
  }
}
