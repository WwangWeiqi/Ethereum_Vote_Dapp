pragma solidity ^0.4.11;

contract Election {
	//Model a candidate
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	//Store candidate
	//Fetch candidate
	mapping(uint => Candidate) public candidates;

	//Store candidate count
	uint public candidatesCount;

	function Election() public{
		addCandidate('Candidate1');
		addCandidate('Candidate2');
	}

	function addCandidate (string _name) private {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0); 
	}
}