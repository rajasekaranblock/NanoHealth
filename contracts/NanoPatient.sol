pragma solidity ^0.4.11;
import "./owned.sol";
import "./NanoToken.sol";



contract NanoPatient is owned  {


    // Patient Details
    struct Patients {
        uint id;
        string name;
        uint age;
        uint weight;
        uint height;
        address padd;

    }
    //Mapping address tp Patients

    mapping (uint => Patients) public patientss;
    uint patientID;

    //Collection of address

    address[] public patientsAccount;


    //Insert Patient Details
    //addPatient(name,age,weight,height,account)
    function addPatient(string _name, uint _age, uint _weight, uint _height) payable public  {



        patientID++;
        patientss[patientID] = Patients(patientID, _name, _age, _weight, _height, msg.sender);

        /**patientss[_paddress].name = _name;
        patientss[_paddress].age = _age;
        patientss[_paddress].weight = _weight;
        patientss[_paddress].height = _height;
        patientsAccount.push(_paddress)-1;**/

    }

    function getPatients()  public constant returns (uint[]) {


          if (patientID == 0) {
          return new uint[](0);
          }
          uint[] memory patId = new uint[](patientID);

          uint addid=0;
          for (uint i = 1; i <= patientID; i++) {
            patId[addid] = patientss[i].id;
            addid++;
          }

          uint[] memory patientcount = new uint[](addid);
          for (uint j = 0; j < addid; j++) {
            patientcount[j] = patId[j];
            }
          return (patientcount);

    }


  /**  function getPatient(address ins) view public returns (string, uint, uint, uint) {
          // Get Specific Patient details

        return (patientss[ins].name, patientss[ins].age, patientss[ins].weight, patientss[ins].height);

    }

    function getpatientCount() view public returns (uint) {
          // Get Patients Count

        return patientsAccount.length;

    }*/


}
