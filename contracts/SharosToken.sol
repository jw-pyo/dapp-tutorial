pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract SharosToken is StandardToken {

    string public symbol;
    string public name;
    uint8 public decimal;

    uint256 public total_agree = 0;
    uint256 public total_disagree = 0;
    uint256 public total;
    uint256 public rate;
    
    constructor(string symbol_, string name_, uint256 _totalSupply) public {
        symbol = symbol_; // "SHAROS"
        name = name_; // "SHAROS TOKEN"
        totalSupply_ = _totalSupply; // "100000000"
        balances[msg.sender] = totalSupply_;
    }

    function total() public view returns(uint256) {
        return total_agree + total_disagree;
    }
    function agree(uint256 amt) public returns (bool) {
        total_agree = total_agree.add(amt);
        return true;
    }
    function disagree(uint256 amt) public returns (bool) {
        total_disagree = total_disagree.add(amt);
        return true;
    }



}

