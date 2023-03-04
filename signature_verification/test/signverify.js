const Signverify = artifacts.require('signverify');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

contract("signverify", (accounts) => {

    var signer = accounts[0];
    console.log("Signer", signer);

    it("Should Deploy properly", async () => {
        var instance = await Signverify.deployed();
        console.log(instance.signer);
        assert(instance.signer !== '');
    });

    it("Should return the message Hash", async () => {
        var instance = await Signverify.deployed();
        var message = 'Good Day';
        var messageHash = await instance.getMessageHash(message);
        var _messageHash = web3.utils.soliditySha3(message);
        assert.equal(messageHash, _messageHash);
    });

    it("Should return the correct hash of the message", async () => {
        var instance = await Signverify.deployed();
        var message = 'Good Day';
        var messageHash = await instance.getMessageHash(message);
        var _messageHash = web3.utils.soliditySha3(message);
        console.log("messageHash", _messageHash);
        assert.equal(messageHash, _messageHash);

        var signedMessageHash = await instance.getEthSignedMessageHash(messageHash);
        var _signedMessageHash = await web3.utils.soliditySha3("\x19Ethereum Signed Message:\n32", _messageHash);
        assert.equal(signedMessageHash, _signedMessageHash);

        var private_key = "0x06e66028ddf35f3c7dbf8ac65e8e01441809a97cc46c08f10794a2876a660428"
        var _signature = web3.eth.accounts.sign(signedMessageHash, private_key);
        var split = await instance.split(_signature.signature);
        //console.log(split)


    });
    it("should verify and throw TRUE or FALSE ", async () => {
        var instance = await Signverify.deployed();
        var message = 'Good Day';
        var messageHash = await instance.getMessageHash(message);
        var _messageHash = web3.utils.soliditySha3(message);
        assert.equal(messageHash, _messageHash);

        var signedMessageHash = await instance.getEthSignedMessageHash(messageHash);
        var _signedMessageHash = await web3.utils.soliditySha3("\x19Ethereum Signed Message:\n32", _messageHash);
        //assert.equal(signedMessageHash, _signedMessageHash);

        var private_key = "0x06e66028ddf35f3c7dbf8ac65e8e01441809a97cc46c08f10794a2876a660428"
        var _signature = web3.eth.accounts.sign(signedMessageHash, private_key);
        var exact = web3.eth.accounts.sign(messageHash, private_key);

        var verify = await instance.verify(signer, message, exact.signature);
        console.log(verify);

        var result = await web3.eth.accounts.recover(signedMessageHash, _signature.signature);
        console.log("result", result)
    })
})