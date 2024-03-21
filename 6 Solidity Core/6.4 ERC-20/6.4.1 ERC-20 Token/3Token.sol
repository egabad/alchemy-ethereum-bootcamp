// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
  uint256 public totalSupply;
  string public name = "MyToken";
  string public symbol = "MTK";
  uint8 public decimals = 18;
  mapping(address => uint256) balances;
  
  function balanceOf(address _account) external view returns (uint256) {
    return balances[_account];
  }
}