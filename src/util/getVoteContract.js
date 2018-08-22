import Web3 from 'web3'
import {address, ABI} from './constants/sharosToken'

let getVoteContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let voteContract = web3.eth.contract(ABI)
  let voteContractInstance = voteContract.at(address)
  console.log(voteContract)
  console.log(voteContractInstance)
  resolve(voteContractInstance)
})

export default getVoteContract
