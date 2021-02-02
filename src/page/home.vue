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
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import effSidebar from '../layoutComponent/effSidebar';
 import effContent from '../layoutComponent/effContent';
 import effAppBar from '../layoutComponent/effAppBar';

export default {
  components: {
    effSidebar,
    effContent,
    effAppBar
  },
  data(){
    return {
      myArray:[]
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
}

</style>

