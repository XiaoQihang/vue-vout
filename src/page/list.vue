<template>
  <div>
    <ul> 
      <!-- <li v-for="item in data" @click="$router.push(`/list/detail/${item.id}`)" :key="item.id">
        {{item.name}}
      </li> -->
      
    </ul>
    <ul class="drag-ul">
      <li 
        v-for="(item,index) in data" 
        :ref="item.id"
        @mousedown="(e)=>{dragLiEvent(e,item.id,index)}" 
        :class="{'noData': !item.name && !item.vData,'vData': item.vData}"
        :style="'position:'+item.domPosition+';top:'+item.domTop+'px;left:'+ item.domLeft+'px;'"  
        :key="item.id" >
          {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        data:[],
        dataCoordinate:[],
        insertIndex: null,
      }
    },
    created(){
      this.data =[
        {id:199999999,name:'测试数据1',hasInsert:false},
        {id:288888888,name:'测试数据2',hasInsert:false},
        {id:377777777,name:'测试数据3',hasInsert:false},
        {id:466666666,name:'测试数据4',hasInsert:false},
        {id:555555555,name:'测试数据5',hasInsert:false},
      ]
    },
    methods:{
      // 判断当前坐标是否在兄弟元素周边
      whetherByMySide(x,y){
        let result = {val:null,index:null}
        this.dataCoordinate.forEach((item,i)=>{
          /*
           1. 看差值是 正还是负,看差值是否进入范围
           2. 
          */
          let differs = (item.y - y)
          if ( differs < 0 && differs < -50 && item.y){
            result.index = i
          } else if ( differs > 0 && differs > 50 && differs< 100  && item.y){
            result.index = i
          }
          differs = null
        })
        console.log('==========index=========',result.index)
        return result.index
      },
      dragLiEvent(event,val,index){
        let domData = this.data[index]
        //获取所以兄弟元素坐标
        this.getCoordinate()
        let dom = this.$refs[val][0]
        var event = event || window.event  //兼容IE浏览器
        let hasInsert = false
        document.onmousemove = (e)=>{
            //获取所以兄弟元素坐标
            this.getCoordinate()
            if (!hasInsert){
              this.data[index].hasInsert = true
              this.data.splice(index+1,0,{}) // 在原来的位置插入空元素
              hasInsert= true
            }
            var e = e || window.event
            //获取接近哪个dom
            let _index = this.whetherByMySide(e.clientX,e.clientY)
            
            if(this.data[_index]){
              if (this.data[_index].hasInsert === false && this.data[_index].id && _index !== index+1){
                this.data.splice(_index+1,0,{name:domData.name,vData:true}) // 在两个元素之间插入虚拟元素（将要插入的元素）
                this.data[_index].hasInsert = true
              }
            }
            dom.style.cssText = "position: fixed;" +'left:'+ (e.clientX - (dom.offsetWidth/2))+ 'px;' +'top:'+(e.clientY - (dom.offsetHeight/2)) + 'px;';
        }
        document.onmouseup = (event)=>{
          document.onmousemove = null;
          document.onmouseup = null;
          dom.style.cssText=""
          // this.data = this.data.filter((item)=>{
          //   return item.id || !item.vData
          // })
        }
      },
      getCoordinate(){
        this.dataCoordinate = []
        for(let i of this.data){
          if (i.id){
            let obj = this.$refs[i.id][0].getBoundingClientRect()
            this.dataCoordinate.push({
              x:obj.left + (obj.width/2),
              y:obj.top + (obj.height/2),
              no: !!i.position
            })
          }else{
            this.dataCoordinate.push({
              x: null,
              y: null
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .drag-ul{
    >li{
      user-select: none;
      width: 100px;
      height: 100px;
      background: aqua;
      border: 1px solid;
      margin: 5px 0;
    }
    .noData{
      background: transparent;
      border: none;
      animation-name: heightChange;
      animation-duration:0.8s;
      animation-fill-mode: forwards;
    }
    .vData{
      opacity: 0.4;
      animation-name: heightChangeMin;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
  }
  @keyframes heightChange {
    0%{}
    100%{height: 0px;}
  }
  @keyframes heightChangeMin {
    0%{height: 0px;}
    100%{height: 100px;}
  }
</style>