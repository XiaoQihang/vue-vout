<template>
  <div class="eff-sidebar" :class="style()">
    <span  v-show="isSpread" class="btn" @click="styleHanld">《《《《《《《《《《《《《《《《《</span>
    <span  v-show="!isSpread"  class="btn" @click="styleHanld">》》》》》》》》》》》》》》》》</span>
      <ul>
      <router-link to="/fileRead">
        文件处理
      </router-link>
      <router-link to="/test">
        测试页面
      </router-link>
    </ul>
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
      isSpread: true
    }
  },
  created(){

  },
  methods:{
    style(){
      return this.isSpread?'root-sidebar on-sidebar':'root-sidebar off-sidebar'
    },
    styleHanld(){
      this.isSpread = !this.isSpread;
    }
  }
}
</script>

<style lang="scss"  scoped>
//引入数学计算函数
@import "../../node_modules/mathsass/dist/math";

@import "../style/sidebar/index.scss";
.btn{
  display: block;
  background: aliceblue;
  cursor: pointer;
}
</style>