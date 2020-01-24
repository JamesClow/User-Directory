<style lang="scss" scoped>
  @import "~@/styles/constants";
  .button-row{
    display: flex;
    align-items: center;
    .button{
      margin: 8px 0px;
      transform: translateX(-4px);
      &.fill, &.outline{
        margin-right: 4px;
        margin-left: 4px;
      }
    }
  }
</style>

<template>
  <div class="button-row">
    <slot>
  </slot>
  </div>
</template>

<script>
  export default{
    
  }
</script>
