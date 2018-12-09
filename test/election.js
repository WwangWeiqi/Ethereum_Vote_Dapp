var Election = artifacts.require("./Election.sol");

contract('Election',function(accounts){
	var electionInstance;

	it('initialize with two candidate',function(){
		return Election.deployed().then(instance => instance.candidatesCount()).
		then(count => {
			assert.equal(count,2);
		});
	});


	it('initialize candidates with corrent value',function(){
		return Election.deployed().then(instance => {
			 electionInstance = instance;
			 return electionInstance.candidates(1);
		}).
		then(candidate => {
			assert.equal(candidate[0],1,'id correct');
			assert.equal(candidate[1],'Candidate1','name correct');
			assert.equal(candidate[2],0,'voteCount correct');
			return electionInstance.candidates(2);
		}).
		then(candidate => {
			assert.equal(candidate[0],2,'id correct');
			assert.equal(candidate[1],'Candidate2','name correct');
			assert.equal(candidate[2],0,'voteCount correct');
		});
	});
});