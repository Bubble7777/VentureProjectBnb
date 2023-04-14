// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VentureVerse is Ownable {

    struct Company {
        address companyOwner;
        string title;
        string desc;
        uint start;
        uint end;
        uint nowDonate;
        uint needDonate;
        uint index;
        address[] donators;
        mapping(address => uint) donation;
    }

    mapping(uint256 => Company) public companies;
    uint public indexCompany;
   
    function createCompany(address _companyOwner, string memory _title, string memory _desc, uint _end, uint _needDonate) external payable {
        require(block.timestamp < _end , "deadline in past");
        require(msg.value == 0.01 ether, "0.01 BNB only");

        Company storage newCompany = companies[indexCompany];   

        newCompany.companyOwner = _companyOwner;
        newCompany.title = _title;
        newCompany.desc = _desc;
        newCompany.start = block.timestamp;
        newCompany.end = _end;
        newCompany.needDonate = _needDonate;
        newCompany.index = indexCompany;

        indexCompany++;
    }

    function makeDonation(uint _id) external payable {
        require(msg.value > 0, 'donate is zero');
        Company storage thisCompany = companies[_id];

        require(block.timestamp < thisCompany.end, "end");
        require(thisCompany.nowDonate <= thisCompany.needDonate, "end donation");      

        (bool sent,) = payable(thisCompany.companyOwner).call{value: msg.value}("");
        
        if(sent) {
            thisCompany.nowDonate += msg.value;
            thisCompany.donators.push(msg.sender);
            thisCompany.donation[msg.sender]+=msg.value;
        } else {
            revert("failed donation");
        }
    }
    
    function getDonate(uint256 _id, address _donator) view external returns (uint) {
        return companies[_id].donation[_donator];
    }

     function getMoney() external onlyOwner {
        address payable owner = payable(owner());
        require(address(this).balance > 0, "No balance to withdraw");
        owner.transfer(address(this).balance);
    }
}