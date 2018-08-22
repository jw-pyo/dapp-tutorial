const Web3 = require("web3")
const HDWalletProvider = require("truffle-hdwallet-provider");

const infura_apikey = "dc19c7e39444456cbc55d9f4d66b6cf9"
const mnemonic = "entire desk anger index wink fall remember artwork true key figure trap"

const wallet = "0x51942b862fbbd9b5152252a061dedffbfec0b04d";

const providerURL = "https://ropsten.infura.io/"+infura_apikey;

let web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

let abi = require("/Users/pyo/frontend/dapp-tutorial/src/util/constants/Funding.json")['abi']
let contract = web3.eth.contract(abi)
let contractInstance = contract.at('0xbadd8bca263c71a8e99191e4aaf63fb6878e4a70')

console.log(contractInstance.initialize)
contractInstance.initialize('0xbadd8bca263c71a8e99191e4aaf63fb6878e4a70', {from: wallet, value: web3.toWei(0.2, 'ether')}).call().then(console.log)
