//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract Box {
    uint256 private value;

    /*emit when the store value is changed */
    event valueStored(uint256 updatedValue);

    /*stores the value in contract */
    function store(uint256 new_value) public {
        value = new_value;

        emit valueStored(new_value);
    }

    /*retrieves the stored value */
    function retrieve() public view returns (uint256) {
        return value;
    }

    /* gets the version */
    function version() public pure returns (uint256) {
        return 1;
    }
}
