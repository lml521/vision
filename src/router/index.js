import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenPage from '../views/sellerpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  }
]

const router = new VueRouter({
  routes
})

export default router
