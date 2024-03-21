// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
  uint256 public deposit;
  address[] public members;
  mapping(address => bool) paid;

  constructor(uint256 _deposit) {
    deposit = _deposit;
  }

  function rsvp() external payable {
    require(msg.value == deposit, "Exact amount needed");
    require(!paid[msg.sender], "Address has already paid");
    paid[msg.sender] = true;
    members.push(msg.sender);
  }

  function payBill(address _venue, uint256 _total) external {
    (bool s1, ) = _venue.call{ value: _total }(""); 
    require(s1);

    uint256 share = address(this).balance / members.length;
    for (uint256 i = 0; i < members.length; i++) {
      (bool s2, ) = members[i].call{ value: share }(""); 
      require(s2);
    }
  }
}