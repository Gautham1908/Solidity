// SPDX-License-Identifier: GPL3.0
pragma solidity ^0.8.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract WebMob is ERC20 {

    address public admin;

    constructor() ERC20('WebmobToken', 'WMT') {
        _mint(msg.sender, 1000);
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, 'Only admin can mint tokens');
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

}

interface contractInterface {
    function transfer(address _to, uint256 _value) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract A {
    address public WebMobContract;
    address public contractB;

    constructor(address _Webmob, address _contractB) {
        WebMobContract = _Webmob;
        contractB = _contractB;
    }

    function issueToken(uint256 value) external {
        contractInterface(WebMobContract).transferFrom(msg.sender, address(this), value);
        contractInterface(WebMobContract).transfer(contractB, value);
    }
}

contract B is ERC20 {
    address public admin;
    constructor() ERC20('Sapphire', 'SPE') {

    }
}
