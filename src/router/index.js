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
  let router = new Router({
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
        meta: {
          title: '日历'
        },
        caseSensitive: true
      },
      {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
          title: '关于 | 饭否每日精选'
        },
        caseSensitive: true
      },
      {
        path: '/status/:statusId',
        name: 'status',
        component: Status,
        meta: {
          title: '状态详情 | 饭否每日精选'
        },
        caseSensitive: true
      },
      {
        path: '*',
        redirect: '/day/today'
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    let title

    if (/^\/day\/today/.test(to.path)) {
      title = '今天精选 | 饭否每日精选'
    }
    else if (/^\/day\//.test(to.path)) {
      title = `${to.params.day} | 饭否每日精选`
    }

    document.title = title
      ? title
      : to.meta.title

    next()
  })

  return router
}