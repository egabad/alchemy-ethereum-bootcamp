// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
  address[] public owners;
  uint256 public required;
  uint256 public transactionCount;
  struct Transaction {
    address destination;
    uint256 value;
    bool executed;
  }
  mapping(uint256 => Transaction) public transactions;

  constructor(address[] memory _owners, uint256 _required) {
    require(_owners.length > 0);
    require(_required > 0);
    require(_required <= _owners.length);
    owners = _owners;
    required = _required;
  }

  function addTransaction(address _dest, uint256 _value) public returns(uint256 id) {
    id = transactionCount;
    transactions[id] = Transaction(_dest, _value, false);
    transactionCount++;
  }
}
