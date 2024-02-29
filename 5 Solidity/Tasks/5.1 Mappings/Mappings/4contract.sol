// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  struct User {
    uint balance;
    bool isActive;
  }

  mapping(address => User) public users;

  function createUser() external {
    require(!users[msg.sender].isActive, "User is active");
    users[msg.sender] = User(100, true);
  }
}