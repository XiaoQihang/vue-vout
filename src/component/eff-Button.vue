<template>
  <div class="eff-button" :class="className">
    <template  v-if="hasIcon" >
       <slot name="icon"></slot>
    </template>
    <div class="eff-button-text-default">
      按钮
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eff-Button',
    data() {
      return {
        
      }
    },
    props:{
      className:{
        type: String,
        default:''
      },
      hasIcon:{
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>


  .eff-button{
    display: inline-block;
    width: 100px;
    color: #333333;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #afafaf;
    background: #ffffff;
    .eff-button-text-default{
      text-align: center;
      font-size: 16px;
    }
  }
  .eff-button-round{
    border-radius: 50%;
  }
</style>