import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Inventory from '@/components/Inventory/Inventory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
