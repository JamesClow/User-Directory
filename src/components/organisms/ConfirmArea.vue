<style lang="scss" scoped>
@import "~@/styles/constants";

.fade-box-enter-active, .fade-box-leave-active{
  transition: opacity 0.4s ease;
}
.fade-box-enter, .fade-box-leave-to{
  opacity: 0;
}
#confirm-area{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(50,50,50,0.5);
  z-index: 200;
  padding-bottom: 60px;
  .confirm-card{
    max-width: 100%;
    flex-basis: 500px;
    margin: 20px;
    box-shadow: $z_depth_2;
    padding: 30px 40px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .confirm-title{
      font-size: 20px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .confirm-description{
      font-size: 16px;
      margin-bottom: 20px;
      // text-align: center;
    }
    .button-row-container{
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}

</style>

<template>
  <transition name="fade-box">
    <div v-if="confirmations.length > 0" id="confirm-area">
      <div class="confirm-card card">
        <div v-if="current_conf.title && current_conf.title != ''" class="confirm-title">
          {{ current_conf.title }}
        </div>
        <div v-if="current_conf.description && current_conf.description != ''" class="confirm-description">
          {{ current_conf.description }}
        </div>
        <div class="button-row-container">
          <button-row>
            <btn @click="stop(current_conf)" class="cancel-button button red" :class="{'active': cancel_selected}">
              {{ current_conf.stop_label ? current_conf.stop_label : "Back" }}
            </btn>
            <btn @click="start(current_conf)" class="confirm-button button red fill" :class="{'active': confirm_selected}" v-if="!current_conf.start_label || (current_conf.start_label && current_conf.start_label) != 'NONE'">
              {{ current_conf.start_label ? current_conf.start_label : "Continue" }}
            </btn>
          </button-row>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Btn from "@/components/atoms/Btn.vue";
  import ButtonRow from "@/components/atoms/ButtonRow.vue";
  export default{
    components: { Btn, ButtonRow },
    created: function(){
      window.addEventListener('keyup', this.hotkeyHandlerUp, false);
    },
    data(){
      return{
        confirm_selected: false,
        cancel_selected: false,
      }
    },
    computed: {
      confirmations: function(){
        return this.$store.state.confirmations;
      },
      current_conf: function(){
        if(this.confirmations.length > 0){
          return this.confirmations[0];
        }else{
          return {};
        }
      }
    },
    watch: {
      'current_conf': function(val){
        this.confirm_selected = false;
        this.cancel_selected = false;
      }
    },
    methods: {
      start(conf){
        if(conf.hasOwnProperty('start')){
          conf.start();
        }
        this.$store.set('resolve');
      },
      stop(conf){
        if(conf.hasOwnProperty('stop')){
          conf.stop();
        }
        this.$store.set('resolve');
      },
      hotkeyHandlerUp(e){
        if(e.key == "ArrowLeft"){
          this.confirm_selected = false;
          this.cancel_selected = true;
        }else if(e.key == "ArrowRight"){
          this.confirm_selected = true;
          this.cancel_selected = false;
        }else if(e.key == "Enter"){
          if(this.confirm_selected){
            this.start(this.current_conf);
          }else if(this.cancel_selected){
            this.stop(this.current_conf);
          }
        }
      },
    }
  }
</script>
