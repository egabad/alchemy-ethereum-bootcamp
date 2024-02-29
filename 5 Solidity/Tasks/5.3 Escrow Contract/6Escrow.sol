// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
  address public depositor;
  address public beneficiary;
  address public arbiter;
  bool public isApproved;
  event Approved(uint256 balance);

  constructor(address _a, address _b) payable {
    arbiter = _a;
    beneficiary = _b;
    depositor = msg.sender;
    isApproved = false;
  }

  function approve() external {
    require(msg.sender == arbiter);
    uint256 amount = address(this).balance;
    (bool sent, ) = beneficiary.call{ value: amount }("");
    require(sent);
    isApproved = true;
    emit Approved(amount);
  }
}