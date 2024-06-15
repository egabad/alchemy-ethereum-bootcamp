// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./5Prime.sol";

contract PrimeGame {
  using Prime for uint;
  function isWinner() external view returns (bool) {
    return block.number.isPrime();
  }
}