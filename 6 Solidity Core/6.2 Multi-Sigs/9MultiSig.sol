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
  mapping(uint256 => mapping(address => bool)) public confirmations;

  constructor(address[] memory _owners, uint256 _required) {
    require(_owners.length > 0);
    require(_required > 0);
    require(_required <= _owners.length);
    owners = _owners;
    required = _required;
  }

  function addTransaction(address _dest, uint256 _value) internal returns(uint256 id) {
    id = transactionCount;
    transactions[id] = Transaction(_dest, _value, false);
    transactionCount++;
  }

  function isOwner(address _account) private view returns (bool) {
    for (uint256 i = 0; i < owners.length; i ++) {
      if (_account == owners[i]) {
        return true;
      }
    }
    return false;
  }

  function confirmTransaction(uint256 _id) public {
    require(isOwner(msg.sender));
    confirmations[_id][msg.sender] = true;
  }

  function getConfirmationsCount(uint256 _id) public view returns (uint256 confirmed) {
    for (uint256 i = 0; i < owners.length; i++) {
      if (confirmations[_id][owners[i]] == true) {
        confirmed++;
      }
    }
  }

  function submitTransaction(address _dest, uint256 _value) public {
    uint256 id = addTransaction(_dest, _value);
    confirmTransaction(id);
  }

  receive() external payable {}
}
