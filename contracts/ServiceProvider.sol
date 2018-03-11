pragma solidity ^0.4.11;



  contract ServiceProvider {

    struct spNano{

      uint id;
      address docadd;
      uint amount;
      string status;

    }
    mapping (uint => spNano) public pays;
    uint payID;
    function addPaydetails(address docadd, uint amount, string status) payable public  {

        payID++;
        pays[payID] = spNano(payID, docadd, amount, status);

    }

    function getPaydetails()  public constant returns (uint[]) {


          if (payID == 0) {
          return new uint[](0);
          }
          uint[] memory paysids = new uint[](payID);

          uint addid=0;
          for (uint i = 1; i <= payID; i++) {
            paysids[addid] = pays[i].id;
            addid++;
          }

          uint[] memory paycount = new uint[](addid);
          for (uint j = 0; j < addid; j++) {
            paycount[j] = paysids[j];
            }
          return (paycount);

    }




}
