const signverify = artifacts.require("signverify");

module.exports = function (deployer) {
    deployer.deploy(signverify);
};
