<template>
  <div class="effContent-container">
    
    <div class="effContent-SecondaryContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'eff-content',
  props:{
    
  },
  data(){
    return{
      switch: 1
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style lang="scss"  scoped>

</style>