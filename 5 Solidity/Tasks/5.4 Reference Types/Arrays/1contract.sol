// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
  function sum(uint256[5] calldata a) external pure returns(uint256 total) {
    for (uint256 i = 0; i < 5; i++) {
      total += a[i];
    }
  }
}