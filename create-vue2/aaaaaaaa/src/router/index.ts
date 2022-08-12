import Vue from 'vue'
import VueRouter from 'vue-router'
import type { RouteConfig } from 'vue-router'
import HomeView from '@/pages/index/HomeView.vue'
import AboutView from '@/pages/index/AboutView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
