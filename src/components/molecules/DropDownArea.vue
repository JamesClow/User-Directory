<style lang="scss" scoped>
  @import "~@/styles/constants";
  .drop-down-area{
    width: 100%;
    .collapsible-header{
      font-size: 18px;
      padding: 10px 20px;
      color: $b;
      display: flex;
      align-items: center;
      flex-direction: row;
      user-select: none;
      &:hover{
        background-color: $w-10;
        // background-color: #EAF1FA;
      }
      .fa-chevron-down{
        flex-grow: 1;
        text-align: right;
        font-size: 16px;
      }
      .fa-chevron-right{
        flex-grow: 1;
        text-align: right;
        font-size: 16px;
      }
      .type-icon{
        font-size: 16px;
        margin-right: 8px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.large{
          font-size: 19px;
        }
      }
      .claim-count{
        margin-left: 6px;
      }
    }
    .collapsible-body{

    }
  }
</style>

<template>
  <div class="drop-down-area">
    <div class="collapsible-header" v-on:click="open = !open">
      <span class="type-icon far" v-if="icon" :class="icon"></span> {{title}}
      <slot name="banner"></slot>
      <span v-if="open" class="far fa-chevron-down"></span>
      <span v-else class="far fa-chevron-right"></span>
    </div>
    <expand-area>
      <div class="collapsible-body" v-show="open">
        <slot :open="open"></slot>
      </div>
    </expand-area>
  </div>
</template>

<script>
  import ExpandArea from "@/components/atoms/ExpandArea.vue";
  export default{
    components: { ExpandArea },
    props: [ 'title', 'icon', 'startOpen', 'activeColor' ],
    created(){
      if(this.startOpen){
        this.open = true;
      }
    },
    data(){
      return{
        open: false,
      }
    },
    watch: {
      open(val){
        if(val){
          this.$emit("opening");
        }else{
          this.$emit("closing");
        }
      }
    },
    methods: {
      expand(){
        this.open = true;
      },
      close(){
        this.open = false;
      }
    }
  }
</script>
