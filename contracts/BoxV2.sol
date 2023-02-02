//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract BoxV2 {
    uint256 private value;

    /*emit the newly stored value */
    event valueStored(uint256 updatedValue);

    /*store the updated value */
    function store(uint256 new_value) public {
        value = new_value;

        emit valueStored(new_value);
    }

    /*get the value */
    function getValue() public view returns (uint256) {
        return value;
    }

    /*get the version */
    function version() public pure returns (uint256) {
        return 2;
    }
}
