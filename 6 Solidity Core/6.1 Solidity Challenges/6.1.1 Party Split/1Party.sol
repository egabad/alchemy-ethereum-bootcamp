// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
  uint256 public deposit;
  mapping(address => bool) paid;

  constructor(uint256 _deposit) {
    deposit = _deposit;
  }

  function rsvp() external payable {
    require(msg.value == deposit, "Exact amount needed");
    require(!paid[msg.sender], "Address has already paid");
    paid[msg.sender] = true;
  }
}