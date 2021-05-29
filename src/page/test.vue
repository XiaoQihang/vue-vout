<template>
  <div>
    <h1>组件页面</h1>
    <effButton>阿斯蒂芬</effButton>
    <effButton>按钮</effButton>
    <div class="black-bg">
      <effButton type="sparkled" class="color-red">炫彩按钮</effButton>
    </div>
    <effSeamlessRoll>

    </effSeamlessRoll>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import effButton from '@/component/eff-Button'
import effSeamlessRoll from '@/component/eff-SeamlessRoll'

  export default {
    name: '',
    components:{
      effButton,
      effSeamlessRoll
    },
    data() {
      return {
        myChart:null,
      }
    },
    created(){

    },
    mounted(){
      setTimeout(()=>{
        var chartDom = document.getElementById('main');
        this.myChart = echarts.init(chartDom);
        var option;

        option = {
            series: [{
                type: 'gauge',
                progress: {
                    show: true,
                    width: 18
                },
                axisLine: {
                    lineStyle: {
                        width: 18
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: 25,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 25,
                    itemStyle: {
                        borderWidth: 10
                    }
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 80,
                    offsetCenter: [0, '70%']
                },
                data: [{
                    value: 70
                }]
            }]
        };
        option && this.myChart.setOption(option);

      })
      window.onresize = ()=>{ 
        this.myChart.resize()
      }
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
.color-red{color:red}
#main{
  width: 100%;
  height: 600px;
}
.auto-srcoll{
  width: 500px;
  text-align: center;
  ul{
    height: 100%;
  }
  li{
    padding: 10px 0;
    background: chocolate;
  }
  li:nth-child(1){
    background: rgb(106, 230, 58);
  }
  li:nth-child(2){
    background: rgb(58, 155, 230);
  }
  li:nth-child(3){
    background: rgb(225, 76, 233);
  }
}
.black-bg{
  padding: 40px;
  display: inline-block;
  background: #000000;
}
</style>