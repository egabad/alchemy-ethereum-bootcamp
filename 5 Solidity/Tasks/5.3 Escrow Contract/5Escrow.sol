// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
  address public depositor;
  address public beneficiary;
  address public arbiter;
  bool public isApproved;

  constructor(address _a, address _b) payable {
    arbiter = _a;
    beneficiary = _b;
    depositor = msg.sender;
    isApproved = false;
  }

  function approve() external {
    require(msg.sender == arbiter);
    (bool sent, ) = beneficiary.call{ value: address(this).balance }("");
    require(sent);
    isApproved = true;
  }
}