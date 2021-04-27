import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!JSON.parse(localStorage.getItem('tempAccount'))) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/') {
      if (JSON.parse(localStorage.getItem('tempAccount'))) {
        next({ path: '/home' })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})
