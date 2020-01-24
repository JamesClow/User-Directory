import { make } from 'vuex-pathify'
import { newUser } from "./user.schema.js"
import { getUserList, addNewUser, updateUser, deleteUser } from '@/api/jumpCloudApi.js'

const state = {
  users: {},
  editable_user: null
}

const getters = {
  ...make.getters(['users']),
  user: state => id => {
    return users[id]
  }
}

const mutations = {
  ...make.mutations(['users', 'editable_user']),
  setUser(state, user){
    state.users[user.id] = user;
  },
  setEditableUser(state, user){
    state.editable_user = JSON.parse(JSON.stringify(user))
  },
  newEditableUser(state){
    state.editable_user = newUser();
  },
  resetEditableUser(state){
    state.editable_user = null;
  }
}

const actions = {
  loadUsers: ({commit})=>{
    getUserList().then(users=>{
      commit("users", users)
    }).catch(response=>{
      console.log(response);
    })
  },
  addUser: ({commit, store})=>{
    addNewUser(store.editable_user).then(user=>{
      commit("setUser", user);
      commit("resetEditableUser");
    }).catch(response=>{
      console.log(response);
    })
  },
  updateUser: ({commit})=>{
    updateUser().then(user=>{
      commit("setUser", user);
      commit("resetEditableUser");
    }).catch(response=>{
      console.log(response);
    })
  },
  removeUser: ({commit})=>{
    deleteUser().then(users=>{
      commit("users", users)
    }).catch(response=>{
      console.log(response);
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
