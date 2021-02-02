<template>
  <div class="effAppBar">
      <div class="list">
          <ul class="clearFloat">
              <li>
                <div class="li-item">动画库</div>
              </li>
              <li>
                <div class="li-item">动画库</div>
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