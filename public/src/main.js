import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

const router = createRouter()
const store = createStore()

// sync(store, router)

const app = new Vue({
  store,
  router,
  render: h => h(App)
})

app.$mount('#app')