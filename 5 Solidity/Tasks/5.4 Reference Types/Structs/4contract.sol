// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
  enum Choices { Yes, No }
  
  struct Vote {
    Choices choice;
    address voter;
  }

  Vote[] public votes;
  Vote private none = Vote(Choices(0), address(0));
  
  function createVote(Choices choice) external {
    votes.push(Vote(choice, msg.sender));
  }

  function findVote(address _a) public view returns(Vote memory) {
    for (uint256 i = 0; i < votes.length; i++) {
      if (votes[i].voter == _a) {
        return votes[i];
      }
    }
    return none;
  }

  function hasVoted(address _a) external view returns(bool) {
    return findVote(_a).voter == _a;
  }

  function findChoice(address _a) external view returns(Choices) {
    return findVote(_a).choice;
  }
}