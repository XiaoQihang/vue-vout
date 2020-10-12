<template>
  <div class="effContent-container">
    <div class="goBack">返回</div>
    <div class="effContent-SecondaryContainer">

      <slot></slot>

    </div>

  </div>
</template>

<script>

export default {
  name: 'eff-content',
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

  }
}
</script>

<style lang="scss"  scoped>
.effContent-container{
  background: #F5F7FA;
  .effContent-SecondaryContainer{
    padding: 20px;
  }
}
</style>