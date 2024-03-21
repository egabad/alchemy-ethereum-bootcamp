// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
  uint256 public totalSupply;
  string public name = "MyToken";
  string public symbol = "MTK";
  uint8 public decimals = 18;
  mapping(address => uint256) balances;

  event Transfer(address from, address to, uint256 amount);

  constructor() {
    totalSupply = 1000 * (10**decimals);
    balances[msg.sender] = totalSupply;
  }
  
  function balanceOf(address _account) external view returns (uint256) {
    return balances[_account];
  }

  function transfer(address _to, uint256 _amount) public {
    require(balances[msg.sender] >= _amount, "Not enough balance");
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
    emit Transfer(msg.sender, _to, _amount);
  }
}