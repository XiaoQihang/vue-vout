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
        liHight:41
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
      // 自动滚动初始化
      this.scrollInit()
    },
    methods:{
      scrollInit(){
        //获取li的高度
        this.liHight = document.querySelector('.effSrcoll>li').clientHeight
      },
      startSrcoll(){
        let timer =setInterval(()=>{
          this.translateY--
          if ( (this.translateY *-1) > (2 * this.liHight) ) {
            this.dataUpdating(this.listData)
            this.translateY = -2
          }
        },50)
      },
      dataUpdating(data){
        let lom = JSON.parse(JSON.stringify(data))
        let arr = data.splice(0,2)
        let arr2 = lom.splice(0,2)
        for( let i of arr2){
          data.push(i)
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