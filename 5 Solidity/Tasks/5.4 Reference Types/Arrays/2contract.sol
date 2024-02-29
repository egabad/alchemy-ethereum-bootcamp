// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
  function sum(uint256[] calldata a) external pure returns(uint256 total) {
    for (uint256 i = 0; i < a.length; i++) {
      total += a[i];
    }
  }
}