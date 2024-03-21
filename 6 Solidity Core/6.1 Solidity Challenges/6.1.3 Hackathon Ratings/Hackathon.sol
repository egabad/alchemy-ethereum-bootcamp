// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
  struct Project {
    string title;
    uint[] ratings;
  }
  
  Project[] projects;

  function newProject(string calldata _title) external {
    // creates a new project with a title and an empty ratings array
    projects.push(Project(_title, new uint[](0)));
  }

  function rate(uint _idx, uint _rating) external {
    // rates a project by its index
    projects[_idx].ratings.push(_rating);
  }

  function getAve(uint256[] memory ratings) internal pure returns (uint256) {
    uint256 sum;
    for (uint256 i = 0; i < ratings.length; i++) {
      sum += ratings[i];
    }
    return sum/ratings.length;
  }

  function findWinner() external view returns (Project memory topProject) {
    uint256 maxAve = 0;
    for (uint256 i = 0; i < projects.length; i++) {
      uint256 ave = getAve(projects[i].ratings);
      if (ave > maxAve) {
        maxAve = ave;
        topProject = projects[i];
      }
    }
  }
}
