import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage from '../views/sellerpage.vue'
import TrendPage from '../views/TrendPage.vue'
import MapPage from '../views/MapPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  },{
    path: '/trendpage',
    component: TrendPage
  },{
    path: '/mappage',
    component: MapPage
  }
]

const router = new VueRouter({
  routes
})

export default router
