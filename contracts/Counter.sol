pragma solidity ^0.4.22;

contract Counter {
  uint256 count;

  constructor() public {
    count = 0;
  }

  function increment() public {
    count += 1;
  }

  function getCount() public view returns (uint256) {
    return count;
  }
}