<template>
  <div class='metamask-info'>
    <!--<p v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask installed</p>
    <p v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask not found</p>
    <p>Network: {{ network }}</p>
    <p>Account: {{ coinbase }}</p>
    <p>Balance: {{ balance }} Wei // {{ ethBalance }} Eth</p>-->
    <md-card class="md-primary" md-theme="orange-card" md-with-hover>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title" align="left">Metamask Account</div>
          <div class="md-subhead" align="left">{{ coinbase }}</div>
        </md-card-header-text>
      </md-card-header>
      <md-card-contents name="contents">
        <div class="md-contents" align="left">
            &nbsp;&nbsp;&nbsp;&nbsp;Balance: {{ ethBalance }} ETH <br>
        </div>
      </md-card-contents>
      <md-card-actions>
          <md-button id="network-name"><i aria-hidden="true" class="fa fa-check"></i> Operate on {{ network }} </md-button>
    
      </md-card-actions>
    </md-card>

  </div>
</template>

<script>
import vueButtonEffect from 'vue-button-effect'
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
import { MdCard } from 'vue-material/dist/components'
import Vue from 'vue'
import Web3 from 'web3'
export default {
  name: 'hello-metamask',
  beforeCreate () {
    Vue.use(MdCard)
    Vue.use(Web3)
    console.log('sb dispatching updateVoteContractInstance in hello-metamask')
    this.$store.dispatch('updateVoteContractInstance')
  },
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    },
    tokenBalance: state => {
        return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  }),
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.metamask-info {
  text-align:center;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}
#network-name {
  color: green;
}
</style>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

@include md-register-theme("green-card", (
primary: md-get-palette-color(green, 500)
));

@include md-register-theme("black-card", (
primary: md-get-palette-color(black, 500)
));

@include md-register-theme("purple-card", (
primary: md-get-palette-color(purple, 300)
));

@include md-register-theme("orange-card", (
primary: md-get-palette-color(orange, 200)
));

@import "~vue-material/dist/base/theme";
@import "~vue-material/dist/components/MdCard/theme";

.md-card {
    width: 40%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>
