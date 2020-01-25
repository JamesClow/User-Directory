<style lang="scss" scoped>
  @import "~@/styles/constants";
  .user-input{
    position: relative;
    display: flex;
    align-items: center;
    input {
      flex: 1;
      padding: 4px 8px;
      font-size: 14px;
      border-radius: 3px;
      border: 1px solid #DDD;
      box-shadow: $z_depth_0;
      color: $input;
      font-family: 'Montserrat', sans-serif;
      background-color: rgba(255,255,255,0);
      &:focus {
        border-color: $input-border-active;
        outline: 0;
      }
      &.edited{
        border-color: $y !important;
      }
    }
  }
</style>

<template>
  <div class="user-input input">
    <input v-model="active_value" :class="{edited}"/>
  </div>
</template>

<script>
  export default{
    props: ["value"],
    created(){
      this.value_copy = this.value;
    },
    data(){
      return {
        value_copy: this.value,
      }
    },
    computed: {
      edited(){
        return this.value_copy != this.value;
      },
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
