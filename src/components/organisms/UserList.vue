<style lang="scss" scoped>
  @import "~@/styles/constants";
</style>

<template>
  <div>
    <div v-for="" class="user-card-container">
      <user-card></user-card>
    </div>
  </div>
</template>

<script>
  import UserCard from '@/components/molecules/UserCard.vue'
  export default{
    components: { UserCard }
  }
</script>
