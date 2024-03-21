// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {
  function plunder(address[] calldata _accounts) external {
    for (uint256 i = 0; i < _accounts.length; i++) {
      IERC20(_accounts[i]).transfer(msg.sender, IERC20(_accounts[i]).balanceOf(address(this)));
    }
  }
}
