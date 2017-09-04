import Vue from 'vue'
import Router from 'vue-router'
import List from '../pages/List.vue'
import Calendar from '../pages/Calendar.vue'

Vue.use(Router)

export function createRouter () {
  return new Router ({
    mode: 'history',
    linkActiveClass: 'current',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/d/:day', name: 'list', component: List },
      { path: '/calendar', name: 'calendar', component: Calendar },
      { path: '*', redirect: '/d/today' }
    ]
  })
}
