<style lang="scss" scoped>
  @import "~@/styles/constants";
  .form-input{
    .title{
      // font-size: 12px;
      padding: 2px 4px;
    }
  }
</style>

<template>
  <div class="form-input">
    <div class="title">
      {{title}}
    </div>
    <in :value="value" @input="$emit('input', $event)" class="input"></in>
  </div>
</template>

<script>
  import In from "@/components/atoms/In.vue";
  export default{
    components: { In },
    props: [ "title", "value" ],
    watch:{
      
    },
    methods:{
      
    }
  }
</script>
