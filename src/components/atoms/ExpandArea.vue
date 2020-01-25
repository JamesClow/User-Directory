
<template>
  <transition mode="out-in" v-on:enter="expand" v-on:leave="shrink">
    <slot></slot>
  </transition>
</template>

<script>
  import { TweenLite, TimelineLite } from "gsap";
  export default{
    props: [ 'baseHeight' ],
    computed: {
      base_height: function(){
        if(this.baseHeight){
          return this.baseHeight;
        }else{
          return "0rem";
        }
      }
    },
    methods: {
      shrink(el, done){
        if(!el.classList.contains("collapsed")){
          el.style.overflow = "hidden";
          TweenLite.to(el, 0.4, {height: this.base_height, opacity: 0, ease: 'sine.inOut'}).eventCallback("onComplete", function(){
            el.style.height = "auto";
            el.style.opacity = 1;
            done();
          });
        }else{
          done();
        }
      },
      expand(el, done){
        if(!el.classList.contains("collapsed")){
          el.style.overflow = "hidden";
          TweenLite.from(el, 0.4, {height: this.base_height, opacity: 0, ease: 'sine.inOut'}).eventCallback("onComplete", function(){
            el.style.height = "auto";
            el.style.overflow = "visible";
            done();
          });
        }else{
          done()
        }
      },
    }
  }
</script>
