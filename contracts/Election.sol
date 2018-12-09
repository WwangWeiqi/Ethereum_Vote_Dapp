pragma solidity ^0.4.11;

contract Election {
	string public candidate;

	function Election() public{
		candidate = 'Candidate1';
	}
}