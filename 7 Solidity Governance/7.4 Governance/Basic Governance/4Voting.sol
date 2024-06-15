// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
  enum Votes {None, Yes, No}

  struct Proposal {
    address target;
    bytes data;
    uint yesCount;
    uint noCount;
    mapping (address => Votes) votes;
  }
  
  Proposal[] public proposals;
  
  event ProposalCreated(uint id);
  event VoteCast(uint proposalId, address voter);
  
  function newProposal(address _target, bytes calldata _data) external {
    emit ProposalCreated(proposals.length);
    Proposal storage proposal = proposals.push();
    proposal.target = _target;
    proposal.data = _data;
  }

  function castVote(uint _proposalId, bool _supports) external {
    Proposal storage proposal = proposals[_proposalId];

    if(proposal.votes[msg.sender] == Votes.Yes) {
      proposal.yesCount--;
    }
    if(proposal.votes[msg.sender] == Votes.No) {
      proposal.noCount--;
    }

    if(_supports) {
      proposal.yesCount++;
      proposal.votes[msg.sender] = Votes.Yes;
    }
    else {
      proposal.noCount++;
      proposal.votes[msg.sender] = Votes.No;
    }

    emit VoteCast(_proposalId, msg.sender);
  }
}

