import Vue from 'vue';
import Router from 'vue-router';


const fileUpload =  resolve => require(['../page/fileRead.vue'], resolve)
const home = resolve => require(['../page/home.vue'], resolve)
const indexPage = resolve => require(['../page/index.vue'], resolve)
const fourPage = resolve => require(['../page/404.vue'], resolve)
const testPage = resolve => require(['../page/test.vue'], resolve)
const listPage = resolve => require(['../page/list.vue'], resolve)
const detailPage = resolve => require(['../page/detail.vue'], resolve)


Vue.use(Router);

const router = new Router({
  mode:'history',
  scrollBehavior: () => ({y: 0}),
  routes:[
    { path: '*', component: fourPage },
    {
      path:'/',
      name:'管理页面',
      component: home,
      redirect: '/index',
      children:[{
        path:'/index',
        name:'测试页面',
        component:indexPage
      },{
        path:'/test',
        name:'测试页面',
        component:testPage
      },{
        path:'/fileRead',
        name:'文件处理',
        component: fileUpload
      },{
        path:'/list',
        name:'列表页面',
        component: listPage
      },{
        path:'/list/detail/:id',
        name:'详情页面',
        component: detailPage
      }]
    },
    {
      path:'/404',
      name:'重定向页面',
      component: fourPage
    }
  ]
})

export default router;