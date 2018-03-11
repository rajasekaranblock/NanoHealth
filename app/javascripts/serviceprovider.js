App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  loading: false,


  init: function() {
    // Initialize app
    return App.initWeb3();
  },
  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }

    // right after web3 initalization get account details


    return App.initContract();
  },
  initContract: function() {

    $.getJSON('http://localhost:8080/build/contracts/ServiceProvider.json', function(ServiceProvider) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.ServiceProvider = TruffleContract(ServiceProvider);
      // Set the provider for our contract.
      App.contracts.ServiceProvider.setProvider(App.web3Provider);

      // Listen for events that we specify in our contract
      App.listenToEvents();
      App.getAccountDetails();
    });

  },
  getAccountDetails: function() {
    // wrapper element of account details
    alert("serviceprovider");

    var contractInstance;

    // get deployed contract instance
    App.contracts.ServiceProvider.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.getPaydetails();
    }).then((payId) => {
      // Clear the bet list wrapper
      alert(payId);
      for (var i = 0; i < payId.length; i++) {
            var payIds = parseInt(payId[i]);
            contractInstance.pays(payIds).then((ps) => {
              document.getElementById("payform").style.visibility= "visible";
              /**
              uint id;
              address docadd;
              uint amount;
              string status;
                **/
              $("#apid").text(ps[0]);
              $("#apadd").text(ps[1]);
              $("#amount").text(ps[2]);
              $("#status").text(ps[3]);

              });
          }
});


  },


  listenToEvents: function() {
    // Listen event that we defined in the Contract

  },
};

$(function() {
  $(window).load(function() {
    // we start our App after window loaded
    App.init();
  });
});
