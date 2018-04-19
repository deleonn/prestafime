import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify, {
  theme: {
    primary: '#4CAF50',
    secondary: '#2E7D32',
    accent: '#F57F17',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
