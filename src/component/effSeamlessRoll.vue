<template>
  <div>
    <div 
      class="auto-srcoll" 
      @mouseover.stop="onmouseoverEvent"
      @mouseout.stop="mouseoutEvent" 
      :style="'height:'+height+'px;overflow: hidden;'"
      >
      <ul ref="effSrcoll" class="effSrcoll" :style="`transform: translateY(${translateY}px);`">
        <li v-for="(item,i) in listData">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props:{
      height:{
        type: Number || String,
        default: ()=>300
      }
    },
    data() {
      return {
        liHight: 41,
        timer: null,
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
          },{
            name:'测试数据11'
          },{
            name:'测试数据12'
          },{
            name:'测试数据13'
          },{
            name:'测试数据14'
          },{
            name:'测试数据15'
          },{
            name:'测试数据16'
          },{
            name:'测试数据17'
          },{
            name:'测试数据18'
          },{
            name:'测试数据19'
          }
        ],
        translateY:0,
        idex:0,
      }
    },
    mounted(){
      // 自动滚动初始化
      if (this.scrollInit()){
        this.startTimer()
      }
    },
    methods:{
      scrollInit(){
        this.liHight = document.querySelector('.effSrcoll>li').clientHeight
        return (this.listData.length * this.liHight) > this.height
      },
      dataUpdating(data){
        let lom = JSON.parse(JSON.stringify(data))
        let arr = data.splice(0,1)
        let arr2 = lom.splice(0,1)
        for( let i of arr2){
          data.push(i)
        }
      },
      startTimer(){
        this.timer = setInterval(()=>{
          this.translateY--
          if ( (this.translateY *-1) > ( this.liHight) ) {
            this.dataUpdating(this.listData)
            this.translateY =  -1
          }
        },50)
      },
      clearTimer(){
        clearInterval(this.timer)
        this.timer = null
      },
      onmouseoverEvent(){
        console.log('鼠标移入')
        this.clearTimer()
      },
      mouseoutEvent(){
        console.log('123123')
        this.startTimer()
      }
    },
    beforeDestroy(){
      this.clearTimer()
    }

  }
</script>

<style lang="less" scoped>
  
</style>