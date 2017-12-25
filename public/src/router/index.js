import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const list_view = () => import('../pages/List.vue')
const calendar_view = () => import('../pages/Calendar.vue')

export function createRouter () {
  return new Router ({
    mode: 'history',
    linkActiveClass: 'current-page',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/d/:day', name: 'list', component: list_view },
      { path: '/calendar', name: 'calendar', component: calendar_view },
      { path: '*', redirect: '/d/today' }
    ]
  })
}
