pragma solidity ^0.4.11;


contract NanoDoctor {


    // Patient Details
    struct Doctors {
        uint id;
        string dname;
        uint age;
        string specialist;
        address docaddress;

    }
    //Mapping address tp Patients

    mapping (uint => Doctors) public doctorss;
    uint doctorID;

    //Collection of address

    address[] public doctorsAccount;


    //Insert Doctor Details
    function addDoctor(string _name, uint _age, string _spec) payable public  {

      //adding Doctor
      doctorID++;
      doctorss[doctorID] = Doctors(doctorID, _name, _age, _spec, msg.sender);

      /**  var doctoracctdetails = doctorss[_daddress];
        doctoracctdetails.dname = _dname;
        doctoracctdetails.age = _age;
        doctoracctdetails.specialist = _spec;
        doctorsAccount.push(_daddress)-1; */

}

    function getDoctors() public constant returns (uint[]) {
        // Get doctorsAccountdetails
      //  return doctorsAccount;

            if (doctorID == 0) {
            return new uint[](0);
            }
            uint[] memory docId = new uint[](doctorID);

            uint addid=0;
            for (uint i = 1; i <= doctorID; i++) {
              docId[addid] = doctorss[i].id;
              addid++;
            }

            uint[] memory doctorcount = new uint[](addid);
            for (uint j = 0; j < addid; j++) {
              doctorcount[j] = docId[j];
              }
            return (doctorcount);


    }

    /**function getDoctors(address ins) view public returns (string, uint, string) {
          // Get Specific Doctor details

        return (doctorss[ins].dname, doctorss[ins].age, doctorss[ins].specialist);

    }

    function getdoctorsCount() view public returns (uint) {
          // Get Doctor Count

        return doctorsAccount.length;

    }*/


}
