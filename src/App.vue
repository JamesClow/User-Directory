<style lang="scss">
  @import "~@/styles/constants.scss";
  @import "~@/styles/general.scss";
  html{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-size: 1px;
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
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>
