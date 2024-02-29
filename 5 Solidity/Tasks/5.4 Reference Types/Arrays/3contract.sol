// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
  uint256[] public evenNumbers;

  function filterEven(uint256[] calldata a) external {
    for (uint256 i = 0; i < a.length; i++) {
      if (a[i] % 2 == 0) {
        evenNumbers.push(a[i]);
      }
    }
  }
}