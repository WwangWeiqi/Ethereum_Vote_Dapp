App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init:  function() {
   return App.initWeb3();
  },

  initWeb3:  function() {
    if(typeof web3 != 'undefined'){
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Election.json', function(election){
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      return App.render();
    })
  
  },

  render: function() {
    var electionInstance;
    var loader = $('#loader');
    var content = $('#content');

    loader.show();
    content.hide();

    //load account data
    web3.eth.getCoinbase(function(err,account){
      if(!err){
        App.account = account;
        $('#accountAddress').html('Your account: ' + account);
      }
    });

    //load contract data
    App.contracts.Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount){
      var candidatesResults = $('#candidatesResults');
      var candidatesSelect = $('#candidatesSelect')
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i ++) {
        electionInstance.candidates(i).then(function(candidate){
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
          candidatesResults.append(candidateTemplate);

           var candidateOption = "<option value='" + id + "'>" + name + "</option>";
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted){
      if (hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(err){
      console.warn(err);
    });
  },

  castVote: function(){
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.vote(candidateId,{from:App.account});
    }).then(function(result){
      $('#loader').show();
      $('#content').hide();
    }).catch(function(err){
      console.error(err);
    })
  }
};



$(function() {
  $(window).load(function() {
    App.init();
  });
});
