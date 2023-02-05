import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScreenPage from '../views/sellerpage.vue'
import TrendPage from '../views/TrendPage.vue'
import MapPage from '../views/MapPage.vue'
import RankPage from '../views/RankPage.vue'
import HotPage from '../views/HotPage.vue'
import StockPage from '../views/StockPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView
  },
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
  },{
    path: '/stockpage',
    component: StockPage
  }
]

const router = new VueRouter({
  routes
})

export default router
