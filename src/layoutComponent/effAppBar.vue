<template>
  <div class="effAppBar">
      <div class="list">
          <ul>
              <li v-if="hasHome" @click="$router.push({name:'Index'})">
                <div class="li-item">返回主页</div>
              </li>
              <li v-for="(item,index) in routeInfo" :key="index">
                <div @click="goPage(item.routeName)" class="li-item">{{item.name}}</div>
              </li>
          </ul>
      </div>
      <div class="info"></div>
  </div>
</template>

<script>

export default {
  name: 'eff-appBar',
  props:{
    routeInfo:{
      type: Array,
      default:[]
    }
  },
  data(){
    return{
      
    }
  },
  created(){

  },
  computed:{
    hasHome(){
      console.log(this.$route)
      return this.$route.name !== 'Index'
    }
  },
  methods:{
    goPage(val){
      this.$router.push({name: val})
    }
  }
}
</script>

<style lang="scss"  scoped>
.effAppBar{
    display: inline-flex;
    height: 90px;
    -webkit-box-shadow: 0 2px 8px #f0f1f2;
    box-shadow: 0 2px 8px #f0f1f2;
    .list{
        flex: 1;
        ul{
          height: 100%;
          display: flex;
            li{
              width: 180px;
              position: relative;
              cursor: pointer;
              .li-item{
                position: absolute;
                top: 50%;
                text-align: center;
                transform: translateY(-50%);
                width: 100%;
                cursor: pointer;
              }
            }
        }
    }
    .info{
        width: 200px;
    }
}
</style>