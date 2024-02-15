// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IContract {
  function attempt() external;
}

contract EmitWinner {
  function attempt(address a) external {
    IContract(a).attempt();
  }
}