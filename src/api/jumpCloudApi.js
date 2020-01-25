import axios from 'axios';

import store from "../store/index";
import { newUser } from "@/store/modules/users/user.schema.js"

export function getUserList(){
  return new Promise((resolve, reject)=>{
    axios.get("http://localhost:8005/api/systemusers").then(response=>{
      if(response && response.data){
        resolve(injestUsers(response.data.results))
      }else{
        reject("No user data");
      }
    }).catch(e=>{
      reject(e.response);
    })
  })
}

export function addNewUser(user){
  return new Promise((resolve, reject)=>{
    axios.post("http://localhost:8005/api/systemusers", user).then(response=>{
      if(response && response.data){
        resolve(response.data);
      }else{
        reject("No user data");
      }
    }).catch(e=>{
      reject(e.response);
    })
  })
}

export function updateUser(user){
  return new Promise((resolve, reject)=>{
    axios.put("http://localhost:8005/api/systemusers/"+user.id, user).then(response=>{
      if(response && response.data){
        resolve(response.data);
      }else{
        reject("No user data");
      }
    }).catch(e=>{
      reject(e.response);
    })
  })
}

export function deleteUser(user){
  return new Promise((resolve, reject)=>{
    store.commit('confirm', {
      title: "Delete User?",
      description: "This action is not reverible!",
      start_label: "Delete",
      start: ()=>{
        axios.delete("http://localhost:8005/api/systemusers/"+user.id).then(response=>{
          if(response && response.data){
            resolve(response.data);
          }else{
            reject("No user data");
          }
        }).catch(e=>{
          reject(e.response);
        })
      },
      stop: ()=>{}
    });
  })
}

// normalize array of user / array -> {id: user, ...}
function injestUsers(users){
  return users.reduce((acc, user)=>{
    return {
      ...acc,
      [user.id]: user
    }
  }, {})
}

// merge user with default user settings / insure that the user contains all nessesary properties
function normalizeUser(user){
  return Object.assign({}, newUser(), removeNullProperties(user))
}

function removeNullProperties(obj){
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if(obj[key] != null){
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
