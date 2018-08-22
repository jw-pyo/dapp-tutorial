/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import CasinoDapp from '@/components/casino-dapp'
import MyAccount from '@/components/my-account'
import AgendaList from '@/components/agenda-list'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'casino-dapp',
      component: CasinoDapp
  },{
      path: '/agenda-list',
      name: 'agenda-list',
      component: AgendaList
  },{
      path: '/my-account',
      name: 'my-account',
      component: MyAccount
  }]
})
