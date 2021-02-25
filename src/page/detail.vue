<template>
  <div>
    <span @click="$router.go(-1)">返回</span>
    <h1>详情{{$route.params.id}}页面</h1>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
      }
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>
  
</style>