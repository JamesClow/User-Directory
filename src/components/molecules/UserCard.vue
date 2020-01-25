<style lang="scss" scoped>
  @import "~@/styles/constants";
  .card{
    display: flex;
    align-items: stretch;
    position: relative;
    min-height: 32px;
    &:hover{
      background-color: rgba(73, 163, 223, 0.05);
      .user-controls{
        &.hover-only{
          display: inline-flex;
        }
      }
    }
    .avatar{
      width: 40px;
      min-width: 40px;
      background-color: $b;
      display: flex;
      align-items: center;
      justify-content: center;
      .fa{
        font-size: 18px;
        color: $w;
      }
    }
    .col{
      width: calc(300px - 16px);
      min-width: calc(300px - 16px);
    }
    .user-controls{
      position: absolute;
      top: -2px;
      right: 16px;
      &.hover-only{
        display: none;
      }
      .button{
        // background-color: $w;
      }
    }
  }
</style>

<template>
  <div class="card">
    <div class="avatar">
      <span class="fa fa-user"></span>
    </div>
    <editable-value v-for="(slot, index) in slots" :value="user[slot]" class="col" :ref="'editable-value'+index" @editing="editing_value_count += $event"></editable-value>
    <button-row class="user-controls hover-only" v-if="editing_value_count == 0">
      <btn type="fill" size="small" @click="$store.set('users/setEditableUser', user)"><span class="far fa-pen"></span><span>Edit</span></btn>
      <select-option :options="['Delete User']" @delete-user="$store.dispatch('users/removeUser', user)">
        <btn type="fill" size="small"><span class="fal fa-ellipsis-h"></span></btn>
      </select-option>
    </button-row>
    <button-row class="user-controls" v-if="editing_value_count > 0">
      <btn type="fill" size="small" @click="saveEdits()">Save</btn>
      <btn type="fill" size="small" @click="discardEdits()">Discard</btn>
    </button-row>
  </div>
</template>

<script>
  import Btn from "@/components/atoms/Btn.vue";
  import ButtonRow from "@/components/atoms/ButtonRow.vue";
  import EditableValue from "@/components/molecules/EditableValue.vue";
  import SelectOption from "@/components/molecules/SelectOption.vue";
  export default {
    components: { Btn, ButtonRow, EditableValue, SelectOption },
    props: ['user', 'slots'],
    data(){
      return{
        editing_value_count: 0,
      }
    },
    methods: {
      saveEdits(){
        var user_copy = Object.assign({}, this.user)
        for(var s in this.slots){
          this.$refs['editable-value'+s][0].approveEdit((value, slot)=>{
            Object.assign(user_copy, {[this.slots[s]]: value})
          })
        }
        this.$store.dispatch('users/updateUser', user_copy).then(response=>{
          for(var s in this.slots){
            this.$refs['editable-value'+s][0].stopEditing();
          }
          this.editing_value_count = 0;
        }).catch(response=>{
          console.log(response)
        });
      },
      discardEdits(){
        for(var s in this.slots){
          this.$refs['editable-value'+s][0].discardEdit()
        }
        this.editing_value_count = 0;
      },
    }
  }
</script>
