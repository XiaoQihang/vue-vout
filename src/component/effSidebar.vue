<template>
<div style="height:100%;margin-bottom:20px"  @click.stop="styleHanld">
  <div :class="style()" style="" >
   <slot></slot>
  </div>
</div>
 
</template>

<script>

import draggable from 'vuedraggable';

export default {
  name: 'eff-sidebar',
  props:{
    
  },
  data(){
    return{
      switch: 1
    }
  },
  created(){

  },
  methods:{
    style(){
      return this.switch?'root-sidebar on-sidebar':'root-sidebar off-sidebar'
    },
    styleHanld(){
      this.switch = !this.switch;
    }
  }
}
</script>

<style lang="scss"  scoped>
//引入数学计算函数
@import "../../node_modules/mathsass/dist/math";

@import "../style/sidebar/index.scss";
</style>