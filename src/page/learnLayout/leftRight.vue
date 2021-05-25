<template>
  <div>
    <h1>左右布局</h1>
    <div class="father">
      <div class="son1">
        <div class="grandson1"></div>
        <div class="grandson2"></div>
      </div>
      <div class="line"></div>
      <div class="son2">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .father{
    width: 100%;
    background: #989797;
    overflow: hidden;
    padding: 10px;
    .son1,.son2{
      float: left;
      border: 1px solid #000000;
    }
    .son1{
      width: 49%;
      height: 500px;
      background: #395ccf;
    }
    .son2{
      width: 49%;
      height: 900px;
      background: #7fee4c;
    }
    .line{
      width: 2%;
      float: left;
      height: 2px;
    }
  }
</style>