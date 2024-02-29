// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
  address public depositor;
  address public beneficiary;
  address public arbiter;

  constructor(address _a, address _b) {
    arbiter = _a;
    beneficiary = _b;
    depositor = msg.sender;
  }
}