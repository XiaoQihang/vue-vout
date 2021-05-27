<template>
  <div>
    <h1>组件页面</h1>
    <effButton>阿斯蒂芬</effButton>
    <effButton>按钮</effButton>
    <div class="black-bg">
      <effButton type="sparkled" class="color-red">阿萨德</effButton>
    </div>
    <!-- 自动滚动 -->
    <div class="auto-srcoll" :style="'height:'+300+'px;overflow: hidden;'">
      <ul ref="effSrcoll" class="effSrcoll" :style="`transform: translateY(${translateY}px);`">
        <li v-for="(item,i) in listData">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <button @click="startSrcoll">开始滚动</button>
    <button @click="srcollDown">向下滚动</button>
    <!-- 自动滚动 -->
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
        myChart:null,
        listData:[
          {
            name:'测试数据01'
          },{
            name:'测试数据02'
          },{
            name:'测试数据03'
          },{
            name:'测试数据04'
          },{
            name:'测试数据05'
          },{
            name:'测试数据06'
          },{
            name:'测试数据07'
          },{
            name:'测试数据08'
          },{
            name:'测试数据09'
          },{
            name:'测试数据10'
          }
        ],
        translateY:0,
        idex:0,
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
      startSrcoll(){
        let timer =setInterval(()=>{
          this.$refs.effSrcoll.scrollTop++
          //最大滚动长度 = 当前滚动值 + 当前dom高度
          let maxHeight = this.$refs.effSrcoll.scrollHeight
          // 还有三个li的高度时候，对数组进行处理
          let criticalValue = this.$refs.effSrcoll.scrollTop + this.$refs.effSrcoll.clientHeight + (3 * 31)
          if ( criticalValue >= maxHeight){
            this.dataUpdating(this.listData)
            // clearInterval(timer)
            // timer = null
          }
        },50)
      },
      dataUpdating(data){
        let arr = data[this.idex]
        this.idex++
        if (this.idex>data.length){
          this.idex=0
        }
        data.push(arr)
        if (data){

        }
      },
      srcollDown(){
        let maxHeight = this.$refs.effSrcoll.scrollHeight
        if (this.$refs.effSrcoll.scrollTop+this.$refs.effSrcoll.clientHeight >= maxHeight){
          console.log('触底了')
        }else{
          console.log('还没触底了')
        }
        
      },
      test(){

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
.auto-srcoll{
  width: 500px;
  padding: 10px;
  text-align: center;
  background: rgb(167, 238, 96);
  ul{
    height: 100%;
    overflow: auto;
  }
  li{
    padding: 10px 0;
    background: chocolate;
  }
}
.black-bg{
  padding: 40px;
  display: inline-block;
  background: #000000;
}
</style>