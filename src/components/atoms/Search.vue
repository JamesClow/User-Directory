<style lang="scss" scoped>
  @import "~@/styles/constants";
  .search{
    display: flex;
    align-items: center;
    position: relative;
    // width: 100%;
    flex: 1;
    .search-icon{
      position: absolute;
      top: 50%;
      left: 14px;
      transform: translateY(-50%);
      color: $b;
    }
    .clear-icon{
      position: absolute;
      top: 50%;
      right: 12px;
      padding: 6px;
      transform: translateY(-50%);
      color: $input-placeholder;
      &:hover{
        cursor: pointer;
        color: $b;
      }
    }
    input{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 16px;
      padding: 6px 34px;
      flex-basis: 300px;
      color: $input;
      border-radius: 16px;
      border: 1px solid $b;
      box-shadow: $z_depth_0;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      background-color: rgba(255,255,255,0);
      &::placeholder{
        color: $input-placeholder;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: $input-placeholder;
      }
      &:focus {
        border-color: $input-border-active;
        outline: 0;
      }
    }
  }
</style>

<template>
  <div class="search">
    <span class="search-icon far fa-search"></span>
    <input v-model="active_value" placeholder="Search"/>
    <span v-if="active_value && active_value.length > 0" @click="active_value = ''" class="clear-icon far fa-times"></span>
  </div>
</template>

<script>
  export default {
    props: [ "value" ],
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
    }
  }
</script>
