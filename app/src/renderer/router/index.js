import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import { LoansList } from '@/components/Loans'
import { InventoryList } from '@/components/Inventory'
import { ClientsList } from '@/components/Clients'

Vue.use(Router, {
  theme: {
    primary: '#7CB342',
    secondary: '#33691E',
    accent: '#FF8F00',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/loans',
      name: 'loanslist',
      component: LoansList
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryList
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
