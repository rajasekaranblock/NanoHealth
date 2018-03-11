pragma solidity ^0.4.11;
import "./owned.sol";
import "./NanoToken.sol";



contract Appointment is owned {

  struct Appointments {

    uint appid;
    uint pid;
    string pname;
    address patientAddress;
    address doctorAddress;

  }
  mapping (uint => Appointments) public docappt;
  mapping (address => uint256) public balanceOf;
  uint AppointmentID;


  function addAppointment(uint pid, string pname, address dadd)  payable public {
    AppointmentID++;
    docappt[AppointmentID] = Appointments(AppointmentID, pid, pname, msg.sender, dadd);

  }

  function viewAppointment() public constant returns (uint[]) {

    if (AppointmentID == 0) {
    return new uint[](0);
    }
    uint[] memory appttId = new uint[](AppointmentID);

    uint addid=0;
    for (uint i = 1; i <= AppointmentID; i++) {
      appttId[addid] = docappt[i].appid;
      addid++;
    }

    uint[] memory apptcount = new uint[](addid);
    for (uint j = 0; j < addid; j++) {
      apptcount[j] = appttId[j];
      }
    return (apptcount);


  }
  function transfer(address _to, uint256 _value) {
//          require(balanceOf[msg.sender] >= _value);
  // Check if the sender has enough
  //        require(balanceOf[_to] + _value >= balanceOf[_to]);
  // Check for overflows
          balanceOf[msg.sender] -= _value;
  // Subtract from the sender
          balanceOf[_to] += _value;
  // Add the same to the recipient
      }
}
