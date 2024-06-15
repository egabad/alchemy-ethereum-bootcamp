// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
  struct Proposal {
    address target;
    bytes data;
    uint yesCount;
    uint noCount;
  }

  Proposal[] public proposals;
  
  function newProposal(address _target, bytes calldata _data) external {
    proposals.push(Proposal(_target, _data, 0, 0));
  }

  function castVote(uint _id, bool _supports) external {
    Proposal storage proposal = proposals[_id];
    if (_supports) {
      proposal.yesCount++;
    } else {
      proposal.noCount++;
    }
  }
}
