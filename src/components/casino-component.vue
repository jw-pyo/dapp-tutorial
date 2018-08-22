<template>
  <div class="casino container">
    <h1>DAICO Demo App</h1>
    <h4>Funding Amount: 5000 ETH</h4>
    Voting Amount: <input v-model="amount" placeholder="0 SHAROS"><br><br>
    <button v-on:click='agree(amount)'> Agree </button>
    <button v-on:click='disagree(amount)'> Disagree </button>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
    <div class="event" v-if="winEvent">
      <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> Congragulations, you have won {{winEvent._amount}} wei</p>
      <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i> Sorry you lost, try again.</p>
    </div>
	<br><br>
    <div>
	  <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">투표 현황</div>
            <div class="md-subhead">투표 종료 시간: {{ end_vote_time }} </div>
          </md-card-header>

          <md-card-contents>
              <h4> 찬성: {{ total_agr }}표</h4>
              <h4> 반대: {{ total_disagr }}표</h4>
              <h4> 총 참여 표: {{ total_ }}표</h4>
              <h4 style="color:#5277f1"> 찬성 비율: {{ rate }} %</h4>
          </md-card-contents>

          <md-card-actions>
            <md-button></md-button>
            <md-button></md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </div>
  </div>
</template>

<script>
import vueButtonEffect from 'vue-button-effect'
import {MdCard} from 'vue-material/dist/components'
import {mapState} from 'vuex'
import 'vue-material/dist/vue-material.min.css'
import Vue from 'vue'

export default {
  name: 'casino',
  beforeCreate () {
    Vue.use(vueButtonEffect)
	Vue.use(MdCard)
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
    console.log('dispatching updateVoteContractInstance')
    this.$store.dispatch('updateVoteContractInstance')
  },
  computed: mapState({
    total_agree: state => {
        return state.cache.total_agree;
    },
    total_disagree: state => {
        return state.cache.total_disagree
    },
    total: state => { return state.cache.total },
    agree_rate: state => { return state.voteContractInstance.rate }
  }),
  data () {
    return {
      amount: null,
      pending: false,
      winEvent: null,
      total_agr: 0,
      total_disagr: 0,
      total_: 0,
      rate: 0,
      end_vote_time: new Date()
    }
  },
  methods: {
    clickNumber (event) {
      console.log('BETTING ON NUMBER, AMOUNT', event.target.innerHTML, this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().bet(event.target.innerHTML, {
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let Won = this.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              this.winEvent = result.args
              this.winEvent._amount = parseInt(result.args._amount, 10)
              this.pending = false
            }
          })
        }
      })
    },
    agree (amt) {
        setInterval(
          () => {
            this.total_agr = this.total_agr + parseInt(amt);
            this.total_ += parseInt(amt);
            this.rate = this.total_agr / this.total_ * 100;
            amt = parseInt(0);
        }, 5000)
    },
    disagree (amt) {
        setInterval(
          () => {
            this.total_disagr = this.total_disagr + parseInt(amt);
            this.total_ += parseInt(amt);
            this.rate = this.total_agr / this.total_ * 100;
            amt = parseInt(0);
        }, 5000)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.casino {
     margin-top: 50px;
     text-align:center;
}
#loader {
  width:150px;
}
ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}
li{
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
}
h1 {
    color: #000080;
}
h4 {
    color: #000080;
}
#has-won {
  color: green;
}
#has-lost {
  color:red;
}
</style>
<style lang="scss" scoped>
  .md-card {
	width: 320px;
	margin-left: 80px;
	display: inline-block;
	vertical-align: top;
    float: left;
  }
</style>
