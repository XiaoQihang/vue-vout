import Vue from 'vue';
import Router from 'vue-router';



// 首页
const home = resolve => require(['../page/home.vue'], resolve)
//欢迎页面
const IndexPage = resolve => require(['../page/index.vue'], resolve)

const fourPage = resolve => require(['../page/404.vue'], resolve)
const testPage = resolve => require(['../page/test.vue'], resolve)
const listPage = resolve => require(['../page/list.vue'], resolve)
const detailPage = resolve => require(['../page/detail.vue'], resolve)
const fileUpload =  resolve => require(['../page/fileRead.vue'], resolve)

//布局学习
const LearnLayoutPage = resolve => require(['../page/learnLayout/index.vue'], resolve)
const LearnLayoutLeftRight = resolve => require(['../page/learnLayout/leftRight.vue'], resolve)

Vue.use(Router);

const router = new Router({
  mode:'history',
  scrollBehavior: () => ({y: 0}),
  routes:[
    { path: '*', component: fourPage },
    {
      path:'/',
      name:'Home',
      component: home,
      redirect: '/index',
      children:[{
        path:'/index',
        name:'Index',
        component: IndexPage
      },{
        path:'/test',
        name:'Test',
        component:testPage
      },{
        path:'/fileRead',
        name:'FileRead',
        component: fileUpload
      },{
        path:'/list',
        name:'List',
        component: listPage
      },{
        path:'/list/detail/:id',
        name:'详情页面',
        component: detailPage
      }]
    },
    {
      path:'/learnLayout',
      name:'LearnLayout',
      component: LearnLayoutPage,
      children:[{
        path:'/leftRight',
        name:'LearnLayoutLeftRight',
        component: LearnLayoutLeftRight
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