// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint _x) external pure returns(uint) {
        return _x * 2;
    }

    function double(uint _x, uint _y) external pure returns(uint, uint) {
        return (_x * 2, _y * 2);
    }
}