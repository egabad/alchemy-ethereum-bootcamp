// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
  address public owner;

  event Deployed(address owner);
  event Transfer(address from, address to);
  event ForSale(uint256 price, uint256 timestamp);

  constructor() {
    owner = msg.sender;
    emit Deployed(owner);        
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transfer(address _to) external onlyOwner {
    owner = _to;
    emit Transfer(msg.sender, _to);
  }

  function markPrice(uint256 _price) external onlyOwner {
    emit ForSale(_price, block.timestamp);
  }
}