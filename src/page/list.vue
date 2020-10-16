<template>
  <div>
    <ul>
      <router-link v-for="item in data" :to="'/list/detail'" :key="item.id">
        {{item.name}}
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        data:[]
      }
    },
    created(){
      console.log('我触发了')
      this.data =[
        {id:1,name:'测试数据1'},
        {id:2,name:'测试数据2'},
        {id:3,name:'测试数据3'},
        {id:4,name:'测试数据4'},
        {id:5,name:'测试数据5'},
      ]
    }
  }
</script>

<style lang="scss" scoped>
  
</style>