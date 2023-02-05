import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage from '../views/sellerpage.vue'
import TrendPage from '../views/TrendPage.vue'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
