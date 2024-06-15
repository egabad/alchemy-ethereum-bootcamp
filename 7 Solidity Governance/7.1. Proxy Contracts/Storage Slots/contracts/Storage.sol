// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Storage {
  // uint256 has 256 storage slots
  uint256 public x = 97; // allocates at storage 0 (i.e., 0x0)
  uint256 public y = 56; // 0x1

  mapping(uint256 => uint256) a; // 0x2
  
  constructor() {
    // these will be stored at keccak256(key + base)
    a[1] = 5; // keccak256(0x1 + 0x2)
    a[4] = 10; // keccak256(0x4 + 0x2)
    a[6] = 15; // keccak256(0x6 + 0x2)
  }
}
