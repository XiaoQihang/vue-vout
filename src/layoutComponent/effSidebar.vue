<template>
  <div class="eff-sidebar" :class="style()">
    <span  v-show="isSpread" class="btn" @click="styleHanld">《《《《《《《《《《《《《《《《《</span>
    <span  v-show="!isSpread"  class="btn" @click="styleHanld">》》》》》》》》》》》》》》》》</span>
      <ul v-for="(item,index) in routeInfo">
        <li @click="$router.push({name:item.routeName})"><span>{{item.name}}</span></li>
      </ul>
  </div>
</template>

<script>

export default {
  name: 'eff-sidebar',
  props:{
    routeInfo:{
      type: Array,
      default: []
    }
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
.eff-sidebar{
  ul{
    >li{
      
    }
  }
}
.btn{
  display: block;
  background: aliceblue;
  cursor: pointer;
}
</style>