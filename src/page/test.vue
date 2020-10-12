<template>
  <div>
    <h1>测试页面</h1>
     <div class="container">
        <div class="info"></div>
        <div class="info info2"></div>
        <div class="info info3"></div>
      </div>
      <ul class="clear">
        <li><span class="circle"></span><a href="#">Button</a></li>
        <li><span class="circle"></span><a href="#">Elements</a></li>
        <li><span class="circle"></span><a href="#">Forms</a></li>
        <li><span class="circle"></span><a href="#">Charts</a></li>
      </ul>
      <label class="btn" tabindex="1">
        <input type="checkbox">
        <span>button</span>
      </label>
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

<style lang="less" scoped>
//-----------------------------------------------
  .container {
    position: absolute;
    width: 212px;
    height: 108px;
    border-radius: 10px;
    border: 1px solid #6761cc;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(to bottom, #004dff, #bdccf7);
    overflow: hidden;
}

.info {
    height: 100%;
    width: 120%;
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    top: 80%;
    border-radius: 200%;
    left: 50%;
    transform: translate(-50%, 0);
}

.info2 {
    left: 0px;
}

.info3 {
    left: 100%;
}
@keyframes bolang{
    0% {
      left: 0;
    }
    50% {
        transform:scale(4);
        background: rgba(192,225,250,1);
    }
    100% {
        transform:scale(16);
        background: rgba(192,225,250,0);
    }
}
//-----------------------------------------------
ul{width: 300px;border: red;}

ul li{width: 300px;height: 70px;line-height: 70px;background: #fff;text-align: center;cursor: pointer;overflow: hidden;border: 1px solid #eee;}
ul li:hover .circle{
    animation: circle-opacity 0.5s linear 0s 1;
    -webkit-animation-fill-mode:forwards;/*让动画停在最后是这个属性，*/
    animation-fill-mode:forwards;
}
ul li a{position: relative;left: -50px;color: #333;top: -30px;}
.circle{background: #fff;border-radius: 50%;width: 30px;height: 70px;display: inline-block;margin: 0 auto;}

@keyframes circle-opacity{
    0% {
        background: rgba(192,225,250,0);
    }
    50% {
        transform:scale(4);
        background: rgba(192,225,250,1);
    }
    100% {
        transform:scale(16);
        background: rgba(192,225,250,0);
    }
}
//-----------------------------------------------
.btn{ 
  display: block; 
  width: 300px; 
  outline: 0; 
  overflow: hidden;  
  position: relative; 
  transition: .3s; 
  cursor: pointer; 
  user-select: none; 
  height: 100px; 
  text-align: center; 
  line-height: 100px; font-size: 50px; background: tomato; color: #fff;  border-radius: 10px;}

.btn>span:after{ content: ''; position: absolute; background: transparent; border-radius:50%; width: 100%; padding-top: 100%; left: 50%; top: 50%; transform: translate(-50%,-50%) scale(1);}
.btn:active{ background: orangered;}
.btn>input[type=checkbox]{display: none}
.btn:hover >span:after{animation: ripple-in 1s;}

@keyframes ripple-in{
    0% {
        transform: translate(-50%,-50%) scale(0);
        background: rgba(0,0,0,.25);
    }
    100% {
        transform: translate(-50%,-50%) scale(1);
        background: transparent;
    }
}
@keyframes ripple-out{
    0% {
        transform: translate(-50%,-50%) scale(0);
        background: rgba(0,0,0,.25);
    }
    100% {
        transform: translate(-50%,-50%) scale(1);
        background: transparent;
    }
}
</style>