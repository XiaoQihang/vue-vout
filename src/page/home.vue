<template>
  <div id="root">
    <effAppBar class="head"></effAppBar>
    <div class="mian">
      <effSidebar class="sidebar"></effSidebar>
      <effContent class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </effContent>
    </div>
    <div class="footer">
      <div class="test-div">
      <button :disabled="retreat" @click="backDown" > 后退 </button>
      <button :disabled="advance" @click="backTop">前进</button>
      </div>
    </div>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import effSidebar from '../layoutComponent/effSidebar';
 import effContent from '../layoutComponent/effContent';
 import effAppBar from '../layoutComponent/effAppBar';
 import { mapState } from 'vuex'
export default {
  components: {
    effSidebar,
    effContent,
    effAppBar
  },
  data(){
    return {
      myArray:[],

    }
  },
  computed: {
    ...mapState({
      pageIndex: (state) => state.pageIndex,
      pageList: (state) => state.pageList,
    }),
    retreat(){
      return this.pageIndex <= 0
    },
    advance(){
      return this.pageList[this.pageIndex] == this.pageList[this.pageList.length-1]
    }
  },
  methods:{
    backDown(){
      this.$store.commit('setPageIndex',(this.pageIndex - 1))
      this.$store.commit('sethasBack',(true))
      this.$router.push({
        path: this.pageList[this.pageIndex],
        query: {id: 'no'}
      })
      
    },
    backTop(){
      this.$store.commit('setPageIndex',this.pageIndex + 1)
       this.$router.push({
        path: this.pageList[this.pageIndex],
        query: {id: 'no'}
      }) 
    }
  }
}
</script>

<style lang="less" scoped>

#root{
  display: flex;
  flex-direction:column;
  height: 100%;
  .mian{
    flex: 1;
    display: flex;
    .content{
      flex: 1;
    }
  }
  .footer{
    background: #989898;
    height: 100px;
    .test-div{
      text-align: center;
    }
  }
}

</style>

