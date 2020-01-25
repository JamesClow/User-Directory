<style lang="scss" scoped>
  @import "~@/styles/constants";
</style>

<template>
  <div class="list-controls">
    <button-row>
      <btn type="fill" @click="$store.set('users/newEditableUser')"><span class="far fa-plus"></span><span>Add User</span></btn>
      <!-- <btn type="outline"><span class="far fa-search"></span><span>Search</span></btn> -->
    </button-row>
  </div>
</template>

<script>
  import Btn from "@/components/atoms/Btn.vue";
  import ButtonRow from "@/components/atoms/ButtonRow.vue";
  export default {
    components: { Btn, ButtonRow }
  }
</script>
