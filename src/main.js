import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 引入字体的文件
import './assets/font/iconfont.css'

// 别的组件中 this.$echarts
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
