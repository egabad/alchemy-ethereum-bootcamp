// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
  enum Votes {None, Yes, No}
  uint8 constant VOTE_THRESHOLD = 10;

  struct Proposal {
    address target;
    bytes data;
    uint yesCount;
    uint noCount;
    bool executed;
    mapping (address => Votes) votes;
  }
  
  Proposal[] public proposals;
  mapping(address => bool) voters;

  event ProposalCreated(uint id);
  event VoteCast(uint proposalId, address voter);

  constructor(address[] memory _voters) {
    uint n = _voters.length;
    for (uint i = 0; i < n; i++) {
      voters[_voters[i]] = true;
    }
    voters[msg.sender] = true;
  }

  modifier onlyVoters() {
    require(voters[msg.sender], "Access denied.");
    _;
  }
  
  function newProposal(address _target, bytes calldata _data) external onlyVoters {
    emit ProposalCreated(proposals.length);
    Proposal storage proposal = proposals.push();
    proposal.target = _target;
    proposal.data = _data;
  }

  function castVote(uint _proposalId, bool _supports) external onlyVoters {
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

    if (proposal.yesCount >= VOTE_THRESHOLD && !proposal.executed) {
      (bool success, ) = proposal.target.call(proposal.data);
      require(success);
    }
  }
}

