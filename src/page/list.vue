<template>
  <div>
    <ul> 
      <li v-for="item in data" @click="$router.push(`/list/detail/${item.id}`)" :key="item.id">
        {{item.name}}
      </li>
      
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
      this.data =[
        {id:199999999,name:'测试数据1'},
        {id:288888888,name:'测试数据2'},
        {id:377777777,name:'测试数据3'},
        {id:466666666,name:'测试数据4'},
        {id:555555555,name:'测试数据5'},
      ]
    }
  }
</script>

<style lang="scss" scoped>
  ul{
    li{

    }
  }
</style>