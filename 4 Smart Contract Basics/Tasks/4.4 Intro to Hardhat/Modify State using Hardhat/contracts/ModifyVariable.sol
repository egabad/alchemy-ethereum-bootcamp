//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;
  string public a;

  constructor(uint _x, string memory _a) {
    x = _x;
    a = _a;
  }

  function modifyToLeet() public {
    x = 1337;
  }

  function modifyAString() public {
    a = "b";
  }
}
