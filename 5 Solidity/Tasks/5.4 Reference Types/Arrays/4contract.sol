// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
  function filterEven(uint256[] calldata a) external pure returns(uint256[] memory evens) {
    uint256 numOfEvens;
    for (uint256 i = 0; i < a.length; i++) {
      if (a[i] % 2 == 0) {
        numOfEvens++;
      }
    }

    evens = new uint256[](numOfEvens);
    uint256 evensIndex;
    for(uint256 i = 0; i < a.length; i++) {
      if (a[i] % 2 == 0) {
        evens[evensIndex] = a[i];
        evensIndex++;
      } 
    }
  }
}