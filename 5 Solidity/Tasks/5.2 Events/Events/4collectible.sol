// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
  address public owner;
  uint256 public price;

  event Deployed(address owner);
  event Transfer(address from, address to);
  event ForSale(uint256 price, uint256 timestamp);
  event Purchase(uint256 amount, address buyer);

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
    price = _price;
    emit ForSale(_price, block.timestamp);
  }

  function purchase() external payable {
    require(msg.value >= price);
    require(price > 0);

    (bool success, ) = owner.call{ value: msg.value }("");
    require(success);
    owner = msg.sender;
    price = 0;
    emit Purchase(msg.value, msg.sender);
  }
}