<style lang="scss">
  @import "~@/styles/constants.scss";
  @import "~@/styles/general.scss";
  html{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    background-color: #fAfAfA;
    body{
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat', sans-serif;
      color: #5c6470;
      #app{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

<template>
  <div id="app">
    <user-directory></user-directory>
  </div>
</template>

<script>
  import UserDirectory from "@/components/pages/UserDirectory.vue";
  export default {
    name: 'app',
    components: { UserDirectory }
  }
</script>
