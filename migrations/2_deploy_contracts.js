var NanoToken = artifacts.require("./NanoToken.sol");
var Exchange = artifacts.require("./Exchange.sol");
var Patient = artifacts.require("./NanoPatient.sol");
var Doctor = artifacts.require("./NanoDoctor.sol");
var Appointment=artifacts.require("./Appointment.sol");
var ServiceProvider=artifacts.require("./ServiceProvider.sol");

module.exports = function(deployer) {
  deployer.deploy(NanoToken);
  deployer.deploy(Exchange);
  deployer.deploy(Patient);
  deployer.deploy(Doctor);
  deployer.deploy(Appointment);
  deployer.deploy(ServiceProvider);

};
