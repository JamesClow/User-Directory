import Vue from 'vue'
import Vuex from 'vuex'
import pathify from './pathify.js'

import users from './modules/users/users.js';

Vue.use(Vuex)

const store = {
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    users
  }
}

export default new Vuex.Store({
  plugins: [ pathify.plugin ],
  ...store
})
