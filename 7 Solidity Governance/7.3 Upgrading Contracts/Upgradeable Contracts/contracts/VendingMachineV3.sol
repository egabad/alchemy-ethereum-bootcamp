// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV3 is Initializable {
  // these state variables and their values
  // will be preserved forever, regardless of upgrading
  uint public numSodas;
  address public owner;
  uint public sodaPrice;
  mapping(address => uint) numPurchases;

  function initializeV3() public reinitializer(3) {
    sodaPrice = 1000 wei;
  }

  function purchaseSoda() public payable {
    require(msg.value == sodaPrice, "You must pay the exact amount for a soda!");
    require(numSodas > 0, "Sodas out of stock!");
    numSodas--;
    numPurchases[msg.sender]++;
  }

  function purchases(address _address) external view returns (uint) {
    return numPurchases[_address];
  }

  function restockSoda(uint _numNewSodas) external onlyOwner {
    numSodas += _numNewSodas;
  }

  function setSodaPrice(uint _price) external onlyOwner {
    sodaPrice = _price;
  }

  function withdrawProfits() public onlyOwner {
    require(address(this).balance > 0, "Profits must be greater than 0 in order to withdraw!");
    (bool sent, ) = owner.call{value: address(this).balance}("");
    require(sent, "Failed to send ether");
  }

  function setNewOwner(address _newOwner) public onlyOwner {
    owner = _newOwner;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }
}
