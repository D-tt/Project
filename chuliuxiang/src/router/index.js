import Vue from 'vue'
import Router from 'vue-router'
import Parent from '@/components/parent.vue'
import ErrorPage from '@/components/error.vue'
import Login from '@/components/login.vue'

// ---菜单管理
import MenuManage from '@/components/menu-manage/index.vue'
// ---工作人员管理
import StaffManage from '@/components/staff-manage/index.vue'
// ---客户管理
import CustomerManage from '@/components/customer-manage/index.vue'
// ---箱子管理
import BoxManage from '@/components/box-manage/index.vue'
// ---订单管理
import OrderManage from '@/components/order-manage/index.vue'
// ---广告管理
import AdvManage from '@/components/adv-manage/index.vue'
// ---意见建议
import Options from '@/components/options/index.vue'

Vue.use(Router)

// 单页面跳转
// 路由嵌套
export default new Router({
  routes: [
    {
      path: '*',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/login'
    },
    {
      path: '/parent',
      name: 'parent',
      component: Parent,
      children: [
        {
          path: '/menu-manage',
          name: 'menu-manage',
          component: MenuManage
        },
        {
          path: '/staff-manage',
          name: 'staff-manage',
          component: StaffManage
        },
        {
          path: '/customer-manage',
          name: 'customer-manage',
          component: CustomerManage
        },
        {
          path: '/box-manage',
          name: 'box-manage',
          component: BoxManage
        },
        {
          path: '/order-manage',
          name: 'order-manage',
          component: OrderManage
        },
        {
          path: '/adv-manage',
          name: 'adv-manage',
          component: AdvManage
        },
        {
          path: '/options',
          name: 'options',
          component: Options
        }
      ]
    }
  ]
})
