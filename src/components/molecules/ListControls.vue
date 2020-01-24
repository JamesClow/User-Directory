<style lang="scss" scoped>
  @import "~@/styles/constants";
</style>

<template>
  <div>
    <btn type="fill"><span class="fal fa-plus"></span>Add User</btn>
  </div>
</template>

<script>
  import Btn from "@/components/atoms/Btn.vue";
  import ButtonRow from "@/components/atoms/ButtonRow.vue";
  export default {
    components: { Btn, ButtonRow }
  }
</script>
