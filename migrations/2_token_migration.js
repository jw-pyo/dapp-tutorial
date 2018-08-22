var SharosToken = artifacts.require("./SharosToken.sol");

module.exports = function(deployer, network, accounts) {
    if(network == "ropsten") {
        deployer.deploy(SharosToken, "SHAROS", "SHAROS Token", 100000000);
    } else {
        deployer.deploy(SharosToken, "SHAROS", "SHAROS Token", 100000000);
    }
};
