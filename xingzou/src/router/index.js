import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import A from '@/components/a.vue'    
import B from '@/components/b.vue'
import Life from '@/components/life.vue'
import Parent from '@/components/parent.vue'
import ErrorPage from '@/components/error.vue'
import Other from '@/components/other.vue'
import Login from '@/components/login.vue'
import UserManage from '@/components/user-manage/index.vue'
import MenuManage from '@/components/menu-manage/index.vue'
import GoodsManage from '@/components/goods-manage/index.vue'
import HomeImgManage from '@/components/home-img-manage/index.vue'
import GoodsClassifyManage from '@/components/goods-classify-manage/index.vue'
import CustomerManage from '@/components/customer-manage/index.vue'
import OrderManage from '@/components/order-manage/index.vue'
import HotGoodsManage from '@/components/hot-goods-manage/index.vue'
import ShopInfoManage from '@/components/shop-info-manage/index.vue'
import DriverInfoManage from '@/components/driver-info-manage/index.vue'


Vue.use(Router)

//单页面跳转
//路由嵌套
export default new Router({
  routes: [
    {
      path:'/other',
      name:'other',
      component:Other
    },
    {
      path:'/life',
      name:'life',
      component:Life
    },
    //        项目一的路由
    {
    path: '/',
    name: 'HelloWorld',
    // component: HelloWorld,
    redirect:'/login'
    },
    {
    path:'/login',
    name:'login',
    component:Login
    },
    {
    path:'*',
    name:'error',
    component:ErrorPage
    },
    {
      path:'/parent',
      name:'parent',
      component:Parent,
      children:[
        // {
        //   path:'/a',
        //   name:'a',
        //   component:A
        // },
        // {
        //   path:'/b',
        //   name:'b',
        //   component:B
        // },
        
        {
        path:'/driver-info-manage',
        name:'driver-info-manage',
        component:DriverInfoManage
        },
        {
        path:'/shop-info-manage',
        name:'shop-info-manage',
        component:ShopInfoManage
        },
        {
        path:'/hot-goods-manage',
        name:'hot-goods-manage',
        component:HotGoodsManage
        },
        {
        path:'/order-manage',
        name:'order-manage',
        component:OrderManage
        },
        {
        path:'/customer-manage',
        name:'customer-manage',
        component:CustomerManage
        },
        {
        path:'/goods-classify-manage',
        name:'goods-classify-manage',
        component:GoodsClassifyManage
        },
        {
        path:'/home-img-manage',
        name:'home-img-manage',
        component:HomeImgManage
        },
        {
        path:'/goods-manage',
        name:'goods-manage',
        component:GoodsManage
        },
        {
        path:'/menu-manage',
        name:'menu-manage',
        component:MenuManage
        },
        {
        path:'/user-manage',
        name:'user-manage',
        component:UserManage
        },
      ]  //项目一 parent 的 child
    },   //项目一 parent 的结尾
  ]      // 路由
})
