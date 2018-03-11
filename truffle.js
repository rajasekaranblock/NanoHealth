module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },

    azureNetwork: {
      host: "splvo2kcxsic.eastus.cloudapp.azure.com", 
      network_id: 12121212,
      port: 8545
    }
    
    
    //,
    /**rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4", // Rinkeby ID 4
      from: "0xf7150cf0B00dC06DA91F310f1aa07a376162a552",
      gas: 4600000
    }*/
  }
};
