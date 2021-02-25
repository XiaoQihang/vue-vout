import Vue from 'vue';
import router from './router/router'
import store from './store/index'
import App from './App.vue';
import './style/main.css';


Vue.config.productionTip = false;

router.beforeEach((to,from,next) => {
    //to的路径 不等于 pageList最后一个 且  pageIndex是正常位置
    if(
        to.path !== store.state.pageList[store.state.pageList.length-1]
        &&
        (
            store.state.pageList.length === store.state.pageIndex ||
            (store.state.pageList.length==1 &&store.state.pageIndex==0) ||
            store.state.pageList.length === (store.state.pageIndex+1)
        )
    ){
        store.state.pageList.push(to.path)
        if(store.state.pageIndex==0 && store.state.pageList.length ==1){
            store.state.pageIndex=0
        }else{
            store.state.pageIndex++
        }
    }
    
    if(
        store.state.hasBack && 
        to.path != store.state.pageList[store.state.pageIndex] &&
        store.state.pageIndex != store.state.pageList.length-1 
    ){
        store.state.pageList[store.state.pageIndex+1] = to.path 
        store.state.pageIndex++
    }


    console.log('当前页面坐标',store.state.pageIndex)
    console.log('页面数组',store.state.pageList)
    next()
  });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")