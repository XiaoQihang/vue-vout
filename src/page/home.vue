<template>
  <div id="root">
    <effSidebar class="sidebar">
     
      <ul>
        <router-link>
          
        </router-link>
      </ul>
    </effSidebar>
    <effContent class="content">
      <router-view></router-view>
    </effContent>
  </div>
</template>

<script>
 import draggable from 'vuedraggable';
 import effSidebar from '../component/effSidebar';
 import effContent from '../component/effContent';

export default {
  components: {
    effSidebar,
    effContent
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
  height: 100%;
  .content{
    flex: 1;
  }
}

</style>

