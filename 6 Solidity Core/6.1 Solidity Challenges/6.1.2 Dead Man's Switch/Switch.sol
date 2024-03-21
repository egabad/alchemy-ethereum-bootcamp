// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
  address public owner;
  address public recipient;
  uint256 public lastActivity;

  constructor(address _recipient) payable {
    recipient = _recipient;
    owner = msg.sender;
    lastActivity = block.timestamp;
  }

  function withdraw() external {
    require(block.timestamp - lastActivity >= 52 weeks);
    (bool sent, ) = recipient.call{ value: address(this).balance }("");
    require(sent);
  }

  function ping() external {
    require(owner == msg.sender);
    lastActivity = block.timestamp; 
  }
}