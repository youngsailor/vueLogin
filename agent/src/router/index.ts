import Vue from 'vue'
import VueRouter from 'vue-router'
import 'core-js/modules/es.object.to-string'

Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location: any) {
//   return originalPush.call(this, location).catch((err: any) => err)
// }

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    redirect: '/login',
    breadcrumbName: '登陆',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '../views/Home.vue'),
    children: [
      {
        path: 'userHome',
        name: 'userHome',
        component: () => import(/* webpackChunkName: "about" */ '../components/UserHome.vue'),
        breadcrumbName: '用户首页',
      },
      {
        path: 'inCall',
        name: 'inCall',
        component: () => import(/* webpackChunkName: "inCall" */ '../components/InCall.vue'),
        breadcrumbName: '呼入平台',
      },
      {
        path: 'outCall',
        name: 'outCall',
        component: () => import(/* webpackChunkName: "outCall" */ '../components/OutCall.vue'),
        breadcrumbName: '外呼平台',
        meta: { keepAlive: true },
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
