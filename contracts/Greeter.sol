//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Greeter {
    string public greet;

    function setGreet(string memory _greet) public {
        greet = _greet;
    }

    function getGreet() public view returns (string memory) {
        return greet;
    }
}
