import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// Detect if the user clicks outside of the element
Vue.directive('click-outside', { 
  inserted: function (el, binding, vnode) {
    setTimeout(()=>{
      el.clickOutsideEvent = event => {
        if(!(el == event.target || el.contains(event.target))){
          binding.value();
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
      document.body.addEventListener("touchstart", el.clickOutsideEvent)
    }, 200)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
    document.body.removeEventListener("touchstart", el.clickOutsideEvent)
  },
});

Vue.mixin({
  methods: {
    getUniqueID(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
