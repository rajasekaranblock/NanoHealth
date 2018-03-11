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
    App.getAccountDetails();

    return App.initContract();
  },
  initContract: function() {
    //'$.getJSON('http://localhost:8080/build/contracts/BetBook.json''
    $.getJSON('http://localhost:8080/build/contracts/NanoPatient.json', function(betBookArtifact) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.NanoPatient = TruffleContract(betBookArtifact);
      // Set the provider for our contract.
      App.contracts.NanoPatient.setProvider(App.web3Provider);

      // Listen for events that we specify in our contract
      App.listenToEvents();

    });

    $.getJSON('http://localhost:8080/build/contracts/NanoDoctor.json', function(nanoDoctor) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.NanoDoctor = TruffleContract(nanoDoctor);
      // Set the provider for our contract.
      App.contracts.NanoDoctor.setProvider(App.web3Provider);

      // Listen for events that we specify in our contract
      App.listenToEvents();

    });

    $.getJSON('http://localhost:8080/build/contracts/Appointment.json', function(Appointment) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.Appointment = TruffleContract(Appointment);
      // Set the provider for our contract.
      App.contracts.Appointment.setProvider(App.web3Provider);

      // Listen for events that we specify in our contract
      App.listenToEvents();

    });

    $.getJSON('http://localhost:8080/build/contracts/ServiceProvider.json', function(ServiceProvider) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.ServiceProvider = TruffleContract(ServiceProvider);
      // Set the provider for our contract.
      App.contracts.ServiceProvider.setProvider(App.web3Provider);

      // Listen for events that we specify in our contract
      App.listenToEvents();

    });

  },
  getAccountDetails: function() {
    // wrapper element of account details


    web3.eth.getCoinbase((err, account) => {
      if (err !== null) {
        console.log(err);
        return;
      }
      App.account = account;
      });


  },

  addpatient: function() {
    var name = document.getElementById("name").value;
    var age = parseInt(document.getElementById("age").value);
    var weight = parseInt(document.getElementById("weight").value);
    var height = parseInt(document.getElementById("height").value);


    //personal.unlockAccount(newaccount);

   var patientInstance;
    return App.contracts.NanoPatient.deployed().then(function (instance) {
        patientInstance = instance;
        return patientInstance.addPatient(name,age,weight,height);
    }).then(function () {
        alert("Transaction complete!");
    }).catch(function (e) {
        console.log(e);
        alert("Error sending coin; see log.");
    });



  },
  adddoctor: function() {

    var name = document.getElementById("name").value;
    var age = parseInt(document.getElementById("age").value);
    var speciality = parseInt(document.getElementById("spec").value);



   var doctorInstance;
    return App.contracts.NanoDoctor.deployed().then(function (instance) {
        doctorInstance = instance;
        return doctorInstance.addDoctor(name,age,speciality);
    }).then(function () {
        alert("Transaction complete!");
    }).catch(function (e) {
        console.log(e);
        alert("Error sending coin; see log.");
    });



  },
  getpatient: function() {
    var contractInstance;

    // get deployed contract instance
    App.contracts.NanoPatient.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.getPatients();
    }).then((patId) => {
      // Clear the bet list wrapper
      alert(patId);
      for (var i = 0; i < patId.length; i++) {
            var patIds = parseInt(patId[i]);
            contractInstance.patientss(patIds).then((ps) => {
              document.getElementById("form_patient").style.visibility= "visible";
              $("#pid").text(ps[0]);
              $("#pname").text(ps[1]);
              $("#padd").text(ps[5]);

              });
          }

    });


  },
  getappdetails: function() {
    var contractInstance;

    // get deployed contract instance
    App.contracts.Appointment.deployed().then((instance) => {
      contractInstance = instance;
      alert(App.account);
      return contractInstance.viewAppointment();
    }).then((appId) => {
      // Clear the bet list wrapper
      for (var i = 0; i < appId.length; i++) {
            var appIds = parseInt(appId[i]);
            contractInstance.docappt(appIds).then((ps) => {
            alert(ps);
            document.getElementById("patientappt").style.visibility= "visible";
            $("#apid").text(ps[0]);
            $("#apname").text(ps[2]);
            $("#apadd").text(ps[3]);
          }).catch(()=>{

              alert("No Records");

          });;
          }


    });


  },
  getdct: function() {
    var contractInstance;

    // get deployed contract instance
    App.contracts.NanoDoctor.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.getDoctors();
    }).then((docId) => {
      // Clear the bet list wrapper
      alert(docId);
      for (var i = 0; i < docId.length; i++) {
            var docIds = parseInt(docId[i]);
            contractInstance.doctorss(docIds).then((doc) => {
              document.getElementById("form_patient").style.visibility= "visible";
                alert(doc[0]);
                $("#docid").text(doc[0]);
                $("#docname").text(doc[1]);
                $("#docspec").text(doc[3]);
                $("#dadd").text(doc[4]);
              });
          }

    });


  },
  getconfirm: function() {

    alert("Each Appointment One NANO COIN will be charged");
    var pInstance;
    var pid;
    var pname;
    // get deployed contract instance
    App.contracts.NanoPatient.deployed().then((instance) => {
      pInstance = instance;
      return pInstance.getPatients();
    }).then((patId) => {
      // Clear the bet list wrapper
      alert(patId);
      for (var i = 0; i < patId.length; i++) {
            var patIds = parseInt(patId[i]);
            pInstance.patientss(patIds).then((ps) => {
              document.getElementById("form_patient").style.visibility= "visible";
              pid=ps[0];
              pname=ps[1];
              //$("#padd").text(ps[5]);

              });
          }

    });


    var toaddress="0xa3813f96b359f9abc09520c95ff6024ce1513181";
    var amount=2;

    var doctoraddress=$("#dadd").text();//document.getElementById("dadd").text;

    alert(doctoraddress);

    var contractInstance;

    // get deployed contract instance
    App.contracts.Appointment.deployed().then((instance) => {
      contractInstance = instance;
      return contractInstance.transfer(toaddress,amount);
    }).then((docId) => {
      // Clear the bet list wrapper
      return contractInstance.addAppointment(pid,pname,doctoraddress);
        alert(doctoraddress);
    }).then((e) => {

      console.log(e);
      alert("Appointment Confirmed");

    }).catch(function (e) {
        console.log(e);
        alert("Error sending coin; see log.");
    });


  },
  rqpay: function(){

    var pid = $("#apid").text();
    var paddress = $("#apadd").text();
    var docadd=App.account;
    var amount=2;
    var status="Patient Consulation Successfully Done"


    //personal.unlockAccount(newaccount);

   var payInstance;
    return App.contracts.ServiceProvider.deployed().then(function (instance) {
        payInstance = instance;
        return payInstance.addPaydetails(docadd,amount,status);
    }).then(function () {
        alert("Transaction complete!");
    }).catch(function (e) {
        console.log(e);
        alert("Error sending coin; see log.");
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
