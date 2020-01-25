<style lang="scss" scoped>
  @import "~@/styles/constants";
  .editable{
    display: flex;
    align-items: center;
    padding: 0px 8px;
    &:hover{
      .edit{
        opacity: 1;
      }
    }
    .text{
      padding: 8px 8px;
    }
    .input{
      padding: 0px 0px;
    }
    .user-input{
      flex: 1;
    }
    .edit{
      opacity: 0;
      padding: 0px 8px;
      font-size: 10px;
      color: $input-placeholder;
      &:hover{
        color: $b;
        cursor: pointer;
      }
      &:active{
        color: $b-10;
      }
    }
  }
</style>

<template>
  <div class="editable">
    <span v-show="!edit_value" class="text">{{ value }}</span>
    <in v-show="edit_value" v-model="new_value" class="input"></in>
    <span v-show="!edit_value" class="edit fa fa-pen" @click="startEditing()"></span>
    <span v-show="edit_value"class="edit fa fa-times" @click="stopEditing()"></span>
  </div>
</template>

<script>
  import In from "@/components/atoms/In.vue";
  export default{
    components: { In },
    props: [ "value" ],
    data(){
      return{
        new_value: this.value,
        edit_value: false
      }
    },
    watch:{
      'value': function(value){
        this.stopEditing()
      }
    },
    methods:{
      approveEdit(callback){
        callback(this.new_value);
      },
      discardEdit(){
        this.stopEditing();
      },
      startEditing(){
        this.edit_value = true;
        this.$emit("editing", 1);
      },
      stopEditing(){
        if(this.edit_value){
          this.$emit("editing", -1);
        }
        this.new_value = this.value;
        this.edit_value = false;
      }
    }
  }
</script>
