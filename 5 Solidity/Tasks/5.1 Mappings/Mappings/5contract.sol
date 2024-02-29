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

  function transfer(address _to, uint256 _amount) external {
    require(users[msg.sender].isActive, "Sender is inactive");
    require(users[_to].isActive, "Recipient is inactive");
    require(users[msg.sender].balance >= _amount, "Not enough balance");

    users[msg.sender].balance -= _amount;
    users[_to].balance += _amount;
  }
}