<style lang="scss" scoped>
  @import "~@/styles/constants";
  .button{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 16px;
    padding: 6px 16px;
    color: $button;
    border-radius: 16px;
    white-space: nowrap;
    &:hover{
      cursor: pointer;
      background-color: $button-light-hover;
    }
    &:active{
      background-color: $button-light-active;
    }
    &.small{
      min-height: 15px;
      padding: 4px 12px;
      font-size: 12px;
    }
    &.fill{
      background-color: $button;
      color: $w;
      box-shadow: $z_depth_1;
      &:hover{
        background-color: $button-hover;
      }
      &:active{
        background-color: $button-active;
        box-shadow: $z_depth_0;
      }
    }
    &.outline{
      border: 1px solid $b;
    }
    span{
      &:not(:first-child){
        margin-left: 6px;
      }
      &.fa-ellipsis-h{
        transform: scale(1.8);
      }
      &.fa-pen{
        // font-size: 10px;
      }
    }
    // .fa, .fal, .far{
    //   margin-right: 6px;
    // }
  }
</style>

<template>
  <div class="button" :class="[type, size]" @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props: [ 
      'type', // 'fill', 'outline',
      'size',  // 'small'
    ],
  }
</script>
