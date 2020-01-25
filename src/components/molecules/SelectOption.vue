<style lang="scss" scoped>
  @import "~@/styles/constants";
  .select-container{
    z-index: 10;
    position: relative;
    &.default{
      padding: 0px 10px;
    }
    &.active{
      z-index: 15;
    }
    .card-options{
      // font-size: 24px;
      color: $input-placeholder;
      &:hover{
        color: $b;
        cursor: pointer;
      }
    }
    .options-container{
      position: absolute;
      top: calc(100% + 0px);
      right: 0px;
      min-width: 120px;
      background-color: $w;
      box-shadow: $z_depth_3;
      padding: 8px 0px;
      user-select: none;
      font-size: 16px;
      border: 1px solid $w-10;
      z-index: 1000;
      &.right{
        right: auto;
        left: 0px;
      }
      .title{
        padding: 5px 15px;
        margin-left: 20px;
        color: $w-40;
        font-size: 14px;
      }
      .divider{
        border-bottom: 1px solid $w-10;
        margin: 8px 0px;
      }
      .option{
        display: flex;
        align-items: center;
        padding: 5px 24px;
        // font-size: 14px;
        white-space: nowrap;
        &:hover{
          background-color: $button-light-hover;
          cursor: pointer;
        }
        &:active{
          background-color: $button-light-active;
          color: $b;
        }
        .fa{
          font-size: 14px;
          width: 22px;
          color: $b;
        }
      }
    }
  }
</style>

<template>
  <div class="select-container" :class="{'active': show_options, 'default': !$slots.default}">
    <div class="card-options" @click="show_options = !show_options">
      <slot>
        <div class="fa fa-ellipsis-h" :class="size"></div>
      </slot>
    </div>
    <div class="options-container" :class="location" v-if="show_options" v-click-outside="()=>{ show_options = false }">
      <div v-for="opt in active_options">
        <div v-if="opt.value" class="option" @click="selected(opt)">
          <span class="fa fa-caret-up" v-if="opt.value == 'ascending'"></span>
          <span class="fa fa-caret-down" v-if="opt.value == 'descending'"></span>
          {{opt.display ? opt.display : opt.value}}
        </div>
        <div v-else class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: [ "options", "size", "location" ],
    data(){
      return{
        show_options: false,
      }
    },
    computed: {
      active_options(){
        if(this.options && this.options.length > 0 && typeof this.options[0] == "string"){
          return this.options.map(val=>{
            return { display: val, value: val };
          })
        }else{
          return this.options;
        }
      },
    },
    methods: {
      selected(opt){
        this.$emit(opt.value.toLowerCase().replace(/ /g, '-'));
        this.$emit('selected', opt.value);
        this.show_options = false;
      }
    }
  }
</script>
