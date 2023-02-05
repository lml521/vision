import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage from '../views/sellerpage.vue'
import TrendPage from '../views/TrendPage.vue'
import MapPage from '../views/MapPage.vue'
import RankPage from '../views/RankPage.vue'
import HotPage from '../views/HotPage.vue'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/screen'
  // },
  // {
  //   path: '/screen',
  //   component: ScreenPage
  // },
  {
    path: '/trendpage',
    component: TrendPage
  },{
    path: '/mappage',
    component: MapPage
  },{
    path: '/rankpage',
    component: RankPage
  },{
    path: '/hotpage',
    component: HotPage
  }
]

const router = new VueRouter({
  routes
})

export default router
