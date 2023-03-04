const MultiSigWallet = artifacts.require("MultiSigWallet");

module.exports = function (deployer) {
    deployer.deploy(MultiSigWallet, ["0x71E4D5311030d6040374cE5Ef170dea237Ed6821",
        "0x5ee366e0A211f7e9309f4e571b0499Dbca2e4615",
        "0x42C70543C3c3972bEBCB31AA7dBC7F2922FE99bD"], 2);
};


// 0x71E4D5311030d6040374cE5Ef170dea237Ed6821
// 0x5ee366e0A211f7e9309f4e571b0499Dbca2e4615
// 0x42C70543C3c3972bEBCB31AA7dBC7F2922FE99bD