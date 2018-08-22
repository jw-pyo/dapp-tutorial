<template>
  <div>
    <quick-menu :menu-count=count :icon-class=icons :menu-url-list=list id="quickmenu-"></quick-menu>
    <casino-component/>
    <hello-metamask/>
  </div>
</template>
<script>
import quickMenu from 'vue-quick-menu'
import HelloMetamask from '@/components/hello-metamask'
import CasinoComponent from '@/components/casino-component'
export default {
  name: 'casino-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
    console.log('Update Vote Contract Action dispatched from casino-dapp.vue')
    this.$store.dispatch('updateVoteContractInstance')
  },
  data () {
    return {
      count: 3,
      icons: ['fa fa-wpforms', 'fa fa-bitcoin', 'fa fa-user-circle'],
      list: [
        {'isLink': true, url: '/agenda-list'},
        {'isLink': true, url: '/etherscan'},
        {'isLink': true, url: '/my-account'}
      ],
      backgroundColor: '#ffcc80',
      color: '#ffffff',
      position: 'top-left',
      isOpenNewTab: false
    }
  },
  components: {
    'quick-menu': quickMenu,
    'hello-metamask': HelloMetamask,
    'casino-component': CasinoComponent
  }
}
</script>
<style scoped>
#quickmenu- {
  background-color: '#ffcc80'
}
</style>
