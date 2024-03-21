// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./4Hero.sol";

contract Mage is Hero(50) {
  function attack(address _enemy) override public {
    Enemy(_enemy).takeAttack(AttackTypes.Spell);
    super.attack(_enemy);
  }
}

contract Warrior is Hero(200) {
  function attack(address _enemy) override public {
    Enemy(_enemy).takeAttack(AttackTypes.Brawl);
    super.attack(_enemy);
  }
}