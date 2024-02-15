// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  address public owner;

  constructor() payable {
    require(msg.value >= 1 ether, "Requires at least 1 ether");
    owner = msg.sender;
  }

  function withdraw() public {
    require(msg.sender == owner, "Can only be called by owner");
    payable(msg.sender).transfer(address(this).balance);
  }
}