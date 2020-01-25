<style lang="scss" scoped>
  @import "~@/styles/constants";
  .filter{
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    &.active{
      .fa{
        color: $b;
      }
    }
    .fa{
      margin-right: 6px;
    }
  }
</style>

<template>
  <div class="filter" :class="{active}">
    <span class="fa" :class="getIconClass()"></span>
    {{name}}
  </div>
</template>

<script>
  export default{
    props: ['name'],
    computed:{
      active(){
        return this.name == this.$store.get('users/sort_type')
      }
    },
    methods:{
      getIconClass(){
        if(!this.active){
          return 'fa-sort';
        }else if(this.$store.get('users/sort_direction') == 1){
          return 'fa-caret-up';
        }else{
          return 'fa-caret-down';
        }
      }
    }
  }
</script>
