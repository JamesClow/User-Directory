import Vue from 'vue'
import Vuex from 'vuex'
import pathify from './pathify.js'

import users from './modules/users/users.js';

Vue.use(Vuex)

const store = {
  state: {
    confirmations: []
  },
  mutations: {
    confirm(state, alert){
      state.confirmations.push(alert);
    },
    resolve(state){
      state.confirmations.shift();
    },
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
