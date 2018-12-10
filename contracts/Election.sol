pragma solidity ^0.4.11;

contract Election {
	//Model a candidate
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}
	//store accounts that has voted
	mapping(address => bool) public voters;

	//Store candidate
	//Fetch candidate
	mapping(uint => Candidate) public candidates;

	//Store candidate count
	uint public candidatesCount;

	//vote event 
	event votedEvent(
		uint indexed _candidateId
	);
	

	function Election() public{
		addCandidate('Candidate1');
		addCandidate('Candidate2');
	}

	function addCandidate (string _name) private {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0); 
	}

	function vote (uint _candidateId) public {
		//required voter not voted before
		require (!voters[msg.sender]);
		
		//required candidate available
		require (_candidateId > 0 && _candidateId <= candidatesCount);
		
		//record voter and voted
		voters[msg.sender] = true;

		//update Candidte voteCount
		candidates[_candidateId].voteCount++;

		//trigger event 
		votedEvent(_candidateId);
		
	}
}