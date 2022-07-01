//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Transfers {
    struct Transfer {
        uint amount;
        uint timestamp;
        address sender;
    }

    Transfer[] transfers;

    address owner;
    uint8 maxTransfers;
    uint8 currentTransfers;

    constructor (uint8 _maxTransfers) {
        owner = msg.sender;
        maxTransfers = _maxTransfers;
    }

    function getTransfer(uint8 _index) public view returns (Transfer memory){
        require(_index < transfers.length, "Cannot find this transfer.");

        return transfers[_index];
    }

    modifier requireOwner () {
        require(owner == msg.sender, "Not an owner.");
        _;
    }

    function withdrawTo(address payable _to) public payable requireOwner {
        _to.transfer(address(this).balance);
    }

    receive() external payable {
        if (currentTransfers >= maxTransfers) {
            revert("Cannot accept more transfers.");
        }

        Transfer memory newTransfer = Transfer(msg.value, block.timestamp, msg.sender);

        transfers.push(newTransfer);
        currentTransfers++;
    }
}