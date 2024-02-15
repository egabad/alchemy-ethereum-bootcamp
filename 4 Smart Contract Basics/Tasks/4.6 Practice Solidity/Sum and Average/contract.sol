// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  constructor() {}

  function sumAndAverage(
    uint a, uint b, uint c, uint d
  ) external pure returns(uint256 sum, uint256 ave) {
    sum = a + b + c + d;
    ave = sum/4;
  }
}