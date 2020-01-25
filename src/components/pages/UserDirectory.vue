<style lang="scss" scoped>
  @import "~@/styles/constants";
  .user-directory{
    padding: 60px;
    .page-title{
      // margin-bottom: 16px;
    }
    .edit-user{
      z-index: 100;
    }
  }
</style>

<template>
  <div class="user-directory">
    <div class="page-title h1">
      User Directory
    </div>
    <transition name="fade">
      <edit-user v-if="$store.get('users/adding_user') || $store.get('users/updating_user')" class="edit-user"></edit-user>
    </transition>
    <user-list></user-list>
  </div>
</template>

<script>
  import EditUser from "@/components/organisms/EditUser.vue";
  import UserList from "@/components/organisms/UserList.vue";
  export default {
    components: { EditUser, UserList },
    created(){
      console.log(this.$store)
      this.$store.dispatch("users/loadUsers")
    }
  }
</script>
