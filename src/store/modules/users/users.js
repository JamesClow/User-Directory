import Vue from 'vue'
import { make } from 'vuex-pathify'
import { newUser } from "./user.schema.js"
import { getUserList, addNewUser, updateUser, deleteUser } from '@/api/jumpCloudApi.js'
const state = {
  users: {},
  editable_user: null,
  sort_type: null,
  sort_direction: 1,
  user_modification_type: null,
  adding_user: false,
  updating_user: false,
}

const getters = {
  ...make.getters(['users', 'editable_user', 'adding_user', 'updating_user']),
  user: state => id => {
    return state.users[id]
  },
  sorted_users: (state, getters) => {
    return Object.keys(state.users).map(id=>{
      return state.users[id];
    }).sort((a, b) => {
      if(state.sort_type){
        return a[state.sort_type] > b[state.sort_type] ? 1*state.sort_direction : -1*state.sort_direction;
      }else{
        return a.id > b.id ? 1 : -1
      }
    })
  },
  user_count: (state, getters) => {
    return Object.keys(state.users).length
  }
}

const mutations = {
  ...make.mutations(['users', 'editable_user', 'sort_type', 'sort_direction']),
  setUser(state, user){
    Vue.set(state.users, user.id, user)
    // state.users[user.id] = user;
  },
  deleteUser(state, user){
    state.users = Object.keys(state.users).filter(id=>{
      return id != user.id
    }).reduce((obj, id)=>{
      obj[id] = state.users[id];
      return obj
    }, {});
  },
  setEditableUser(state, user){
    state.adding_user = false;
    state.updating_user = true;
    state.editable_user = JSON.parse(JSON.stringify(user))
  },
  newEditableUser(state){
    state.adding_user = true;
    state.updating_user = false;
    state.editable_user = newUser();
  },
  resetEditableUser(state){
    state.adding_user = false;
    state.updating_user = false;
    state.editable_user = null;
  },
}

const actions = {
  loadUsers: ({commit})=>{
    return new Promise((resolve, reject)=>{
      getUserList().then(users=>{
        commit("users", users)
        resolve(users)
      }).catch(response=>{
        console.error(response);
        reject(response)
      })
    })
  },
  addUser: ({commit, getters})=>{
    return new Promise((resolve, reject)=>{
      addNewUser(getters.editable_user).then(user=>{
        commit("setUser", user);
        commit("resetEditableUser");
        resolve(user);
      }).catch(response=>{
        console.error(response);
        reject(response);
      })
    })
  },
  updateUser: ({commit}, user)=>{
    return new Promise((resolve, reject)=>{
      updateUser(user).then(user=>{
        commit("setUser", user);
        commit("resetEditableUser");
        resolve(user);
      }).catch(response=>{
        console.error(response);
        reject(response);
      })
    })
  },
  removeUser: ({commit}, user)=>{
    return new Promise((resolve, reject)=>{
      deleteUser(user).then(user=>{
        commit("deleteUser", user);
        resolve(user);
      }).catch(response=>{
        console.error(response);
        reject(response);
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
