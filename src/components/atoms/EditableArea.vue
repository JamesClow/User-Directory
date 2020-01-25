<style lang="scss" scoped>
  @import "~@/styles/constants";
  .textarea-container{
    width: 100%;
    max-width: 100%;
    font-size: 15px;
    position: relative;
    .textarea{
      width: 100%;
      max-width: 100%;
      min-height: 21px;
      border-bottom: 2px solid #FFF;
      color: $text-input;
      padding: 3px 4px 1px 4px;
      &:focus{
        border-bottom: 2px solid $b;
      }
    }
    .placeholder{
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 3px 4px 1px 4px;
      color: $text-placeholder;
      pointer-events: none;
    }
  }
</style>

<template>
  <div class="textarea-container">
    <div :ref="'textarea:'+_uid" class="textarea" contenteditable="true" @focus="focus = true; $emit('focus', $event)" @blur="focus = false; $emit('blur', $event)" @input="update" @keyup="$emit('keyup', $event)" @keydown="$emit('keydown', $event)"></div>
    <div class="placeholder" v-if="!value && placeholder">
      {{placeholder}}
    </div>
  </div>
</template>

<script>
  export default{
    props:['value', 'placeholder'],
    mounted(){
      this.mountValue();
    },
    data(){
      return {
        focus: false,
      }
    },
    watch: {
      'value': function(){
        if(!this.focus || this.value == ""){
          this.mountValue();
        }
      }
    },
    methods: {
      mountValue(){
        this.$refs['textarea:'+this._uid].innerText = this.value;
      },
      update(event){
        this.$emit("update:value", event.target.innerText);
        this.$emit("input", event.target.innerText);
      }
    }
  }
</script>
