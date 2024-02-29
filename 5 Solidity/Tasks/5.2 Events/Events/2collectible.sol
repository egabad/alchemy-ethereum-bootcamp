// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
  address public owner;

  event Deployed(address owner);
  event Transfer(address from, address to);

  constructor() {
    owner = msg.sender;
    emit Deployed(owner);        
  }

  function transfer(address _to) external {
    require(msg.sender == owner);
    owner = _to;
    emit Transfer(msg.sender, _to);
  }
}