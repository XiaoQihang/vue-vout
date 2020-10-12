<template>
  <div id="root">
    <effAppBar class="head"></effAppBar>
    <div>
      <effSidebar class="sidebar"></effSidebar>
      <effContent class="content">
        <router-view></router-view>
      </effContent>
    </div>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import effSidebar from '../component/effSidebar';
 import effContent from '../component/effContent';
 import effAppBar from '../component/effAppBar';

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
  div{
    flex: 1;
  }
}

</style>

