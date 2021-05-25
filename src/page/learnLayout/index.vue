<template>
  <div>
    <eff-app-bar :routeInfo="routeDate"></eff-app-bar>
    <h1>学习布局</h1>
    <effContent class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </effContent>
  </div>
</template>

<script>
import effAppBar from '../../layoutComponent/effAppBar';
import effContent from '../../layoutComponent/effContent';
  export default {
    name: 'learnLayoutIndex',
    components:{
      effAppBar,
      effContent
    },
    data() {
      return {
        routeDate:[{
          name:'左右布局',
          routeName:'LearnLayoutLeftRight'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>