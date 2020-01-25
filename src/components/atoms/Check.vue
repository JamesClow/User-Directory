<style lang="scss" scoped>
  @import "~@/styles/constants.scss";
  .checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16rem;
    height: 16rem;
    min-width: 16rem;
    min-height: 16rem;
    border: 2rem solid #BBB;
    border-radius: 2rem;
    &.active{
      border: 2rem solid $checkbox;
      background-color: $checkbox;
    }
    .fa-check{
      font-size: 11rem;
      color: #FFF;
    }
    .fa-minus{
      font-size: 11rem;
      color: #BBB;
    }
  }
</style>

<template>
  <div class="checkbox" :class="{'active': active_value}" @click="toggleActiveValue()">
    <span v-if="active_value" class="fa fa-check"></span>
    <span v-if="active_value === undefined || active_value === null" class="fa fa-minus"></span>
  </div>
</template>

<script>
  export default{
    props: ["value"],
    computed: {
      active_value: {
        get(){
          return this.value;
        },
        set(val){
          this.$emit("update:value", val);
          this.$emit("input", val);
        }
      },
    },
    methods: {
      toggleActiveValue(){
        if(this.active_value){
          this.active_value = false;
        }else{
          this.active_value = true;
        }
      }
    },
  }
</script>
