import Vue from 'vue'
import Router from 'vue-router'

const Day = () => import(
  /* webpackChunkName: "Day" */
  '../pages/Day.vue')

const Calendar = () => import(
  /* webpackChunkName: "Calendar" */
  '../pages/Calendar.vue')

const Status = () => import(
  /* webpackChunkName: "Status" */
  '../pages/Status.vue')

const About = () => import(
  /* webpackChunkName: "About" */
  '../pages/About.vue')

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    fallback: false,
    linkActiveClass: 'current-page',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      {
        path: '/day/:day',
        name: 'day',
        component: Day,
        caseSensitive: true
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: Calendar,
        caseSensitive: true
      },
      {
        path: '/about',
        name: 'about',
        component: About,
        caseSensitive: true
      },
      {
        path: '/status/:statusId',
        name: 'status',
        component: Status,
        caseSensitive: true
      },
      {
        path: '*',
        redirect: '/day/today'
      }
    ]
  })
}