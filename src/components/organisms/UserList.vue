<style lang="scss" scoped>
  @import "~@/styles/constants";
  .list-controls{
    margin-top: 8px;
  }
  .filter-row{
    display: flex;
    padding-left: 40px;
    z-index: 2;
    .filter-container{
      .filter{
        width: calc(300px - 32px);
      }
    }
  }
  .user-card-container{
    margin-bottom: 10px;
    z-index: 1;
  }
</style>

<template>
  <div>
    <list-control></list-control>
    <div v-if="user_count > 0">
      <div class="container">
        <div class="filter-row" ref="filter-row">
          <div v-for="(filter_slot, index) in visible_slots" :key="index" :ref="'filter-'+index" class="filter-container" >
            <select-option :options="filter_options" location="right" @selected="selectFilterOption(index, $event, filter_slot)">
              <filter-button :name="filter_slot"></filter-button>
            </select-option>
          </div>
        </div>
      </div>
      <div v-for="user in users" class="user-card-container">
        <user-card :user="user" :slots="visible_slots"></user-card>
      </div>
    </div>
    <div v-else>
      No Users
    </div>
  </div>
</template>

<script>
  import ListControl from "@/components/molecules/ListControls.vue";
  import UserCard from '@/components/molecules/UserCard.vue'
  import SelectOption from "@/components/molecules/SelectOption.vue";
  import FilterButton from "@/components/atoms/FilterButton.vue";
  import { newUser } from "@/store/modules/users/user.schema.js"
  const ascending = "ascending";
  const descending = "descending";
  export default{
    components: { UserCard, ListControl, SelectOption, FilterButton },
    mounted(){
      this.calcVisibleSlots();
      window.addEventListener('resize', this.calcVisibleSlots, true);
    },
    beforeDestroy(){
      window.removeEventListener('resize', this.calcVisibleSlots, true);
    },
    computed: {
      users(){
        return this.$store.getters['users/sorted_users']
      },
      user_count(){
        return this.$store.getters['users/user_count']
      },
      filter_options(){
        return [
          ascending,
          descending,
          "",
          ...this.getUserProperties()
        ]
      },
      visible_slots(){
        return this.filter_slots.slice(0,  this.visible_slot_count);
      },
    },
    watch:{
      'user_count': function(val){
        this.$nextTick(()=>{
          this.calcVisibleSlots();
        })
      }
    },
    data(){
      return {
        filter_slots: this.getUserProperties(),
        visible_slot_count: 0
      }
    },
    methods:{
      selectFilterOption(slot_index, option, current_slot){
        if(option == ascending || option == descending){
          this.$store.set("users/sort_type", current_slot);
          this.$store.set("users/sort_direction", option == ascending ? 1 : -1);
        }else{
          this.filter_slots.splice(slot_index, 1, option)
        }
      },
      getUserProperties(){
        return Object.keys(newUser())
      },
      calcVisibleSlots(){
        if(this.$refs['filter-row']){
          var row_width = this.$refs['filter-row'].clientWidth;
          this.visible_slot_count = Math.floor(row_width / 300);
        }
        if(this.visible_slot_count == 0){
          this.visible_slot_count = 1;
        }
      }
    }
  }
</script>
