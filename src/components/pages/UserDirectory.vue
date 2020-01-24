<style lang="scss" scoped>
  @import "~@/styles/constants";
  .user-directory{
    padding: 60px;
  }
</style>

<template>
  <div class="user-directory">
    <div class="page-title h1">
      User Directory
    </div>
    <list-control></list-control>
    <user-list></user-list>
  </div>
</template>

<script>
  import EditUser from "@/components/organisms/EditUser.vue";
  import ListControl from "@/components/molecules/ListControls.vue";
  import UserList from "@/components/organisms/UserList.vue";
  export default {
    components: { ListControl, EditUser, UserList },
    created(){
      console.log(this.$store)
      this.$store.dispatch("users/loadUsers")
    }
  }
</script>
