import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/pages/index/HomeView.vue'
import AboutView from '@/pages/index/AboutView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
