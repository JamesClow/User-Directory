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
    &:hover{
      cursor: pointer;
      background-color: $button-light-hover;
    }
    &:active{
      background-color: $button-light-active;
    }
    &.fill{
      background-color: $button;
      color: $w;
      &:hover{
        background-color: $button-hover;
      }
      &:active{
        background-color: $button-active;
      }
    }
    &.outline{
      border: 1px solid $b;
    }
    .fa, .fal, .far{
      margin-right: 6px;
    }
  }
</style>

<template>
  <div class="button" :class="type" @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props: [ 
      'type', // 'fill', 'outline',
    ],
  }
</script>
