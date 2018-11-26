import Vue from 'vue'
import Router from 'vue-router'


//引入登录组件
import Login from '@/components/Login'
//引入主页面组件
import List from '@/components/List'
//引入阅读组件
import ReadingList from '@/components/ReadingList'
//引入关于我组件
import About from '@/components/About'
//引入标签组件
import Tag from '@/components/Tag'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/readinglists',
      component: ReadingList
    },
    {
      path: '/tags',
      component: Tag
    },
    {
      path: '/about',
      component: About
    },
    { path: '*', redirect: '/login' }
  ]
})
