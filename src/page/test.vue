<template>
  <div>
    <h1>组件页面</h1>
    <effButton>阿斯蒂芬</effButton>
    <effButton>按钮</effButton>
    <div class="black-bg">
      <effButton type="sparkled" class="color-red">阿萨德</effButton>
    </div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import effButton from '@/component/eff-Button'

  export default {
    name: '',
    components:{
      effButton
    },
    data() {
      return {
        myChart:null
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
    }
  }
</script>

<style lang="less" scoped>
.color-red{color:red}
#main{
  width: 100%;
  height: 600px;
}
.black-bg{
  padding: 40px;
  display: inline-block;
  background: #000000;
}
</style>