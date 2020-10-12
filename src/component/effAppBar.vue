<template>
  <div class="effAppBar">
      <div class="list">
          <ul class="clearFloat">
              <li>动画库</li>
              <li>组件库</li>
              <li>动画库</li>
          </ul>
      </div>
      <div class="info"></div>
  </div>
</template>

<script>

export default {
  name: 'eff-appBar',
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
.effAppBar{
    display: inline-flex;
    height: 90px;
    .list{
        flex: 1;
        ul{
            li{
                float: left;
            }
        }
    }
    .info{
        width: 200px;
    }
}
</style>