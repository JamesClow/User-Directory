<style lang="scss" scoped>
  @import "~@/styles/constants";
</style>

<template>
  <div class="list-controls">
    <button-row>
      <btn type="fill" @click="$store.set('users/newEditableUser')"><span class="far fa-plus"></span><span>Add User</span></btn>
      <!-- <btn type="outline"><span class="far fa-search"></span><span>Search</span></btn> -->
      <search :value="$store.get('users/search_input')" @input="$store.set('users/search_input', $event)"></search>
    </button-row>
  </div>
</template>

<script>
  import Btn from "@/components/atoms/Btn.vue";
  import ButtonRow from "@/components/atoms/ButtonRow.vue";
  import Search from "@/components/atoms/Search.vue";
  export default {
    components: { Btn, ButtonRow, Search },
    data(){
      return{
        search_input: "",
      }
    },
  }
</script>
