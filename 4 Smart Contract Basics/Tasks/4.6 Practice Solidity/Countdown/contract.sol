// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  uint8 i;

  function tick() external {
    i++;
    if (i == 10) {
        selfdestruct(payable(msg.sender));
    }
  }
}