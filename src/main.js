import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AV from './utils/request'
import { LoadingBar, Message } from 'iview'

import 'iview/dist/styles/iview.css'
import './common/style/main.less'

Vue.prototype.$LoadingBar = LoadingBar
Vue.prototype.$Message = Message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  Vue.prototype.$LoadingBar.start()
  const loginUser = AV.User.current()
  if (!loginUser && to.path !== '/user/register') {
    next({ path: '/user/register' })
  }
  next()
})

router.afterEach(route => {
  Vue.prototype.$LoadingBar.finish()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
