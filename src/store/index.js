import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import getContract from '../util/getContract'
import getVoteContract from '../util/getVoteContract'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
    },
    registerContractInstance (state, payload) {
      console.log('Casino contract instance: ', payload)
      state.contractInstance = () => payload
    },
    registerVoteContractInstance (state, payload) {
      console.log('registerVoteContractInstance executed: ', payload)
      //console.log(JSON.parse(payload).total)
      let result = payload
      let web3Copy = state.voteContractInstance
      web3Copy.web3Instance = result.web3
      web3Copy.total_agree = result.total_agree
      web3Copy.total_disagree = parseInt(15, 10)
      web3Copy.total = result => result.total
      web3Copy.rate = result => result.rate
      web3Copy.voteInstance = result.voteContractInstance
      web3Copy.coinbase = result.coinbase
      state.voteContractInstance = web3Copy
      
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    },
    updateVoteContractInstance ({commit}) {
      getVoteContract.then(result => {
        commit('registerVoteContractInstance', result)
      }).catch(e => console.log(e))
    },
  }
})
