let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  voteContractInstance: {
    voteInstance: null,
    web3Instance: null,
    total_agree: 10,
    total_disagree: 10,
    total: null,
    rate: null,
    coinbase: null,
    balance: null
  },
  sharosToken: null,
  cache: {
    total_agree: 0,
    total_disagree: 0,
    total: 0,
    rate: null
  }
}
export default state
