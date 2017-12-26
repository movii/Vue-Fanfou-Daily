import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const list_view = () => import('../pages/List.vue')
const calendar_view = () => import('../pages/Calendar.vue')
const about_view = () => import('../pages/About.vue')

export function createRouter () {
  let r = new Router ({
    mode: 'history',
    linkActiveClass: 'current-page',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/d/:day', name: 'list', component: list_view },
      { path: '/calendar', name: 'calendar', component: calendar_view },
      { path: '/about', name: 'about', component: about_view },
      { path: '*', redirect: '/d/today' }
    ]
  })

  r.afterEach(router => { 
    router.matched.some(match => {
      let title 

      switch (match.path) {
        case '/d/:day': 
          if (router.params.day === 'today') title = '今日精选'
          else title = router.params.day + ' 精选内容'
          break
        case '/calendar': 
          title = '日历'
          break
        case '/about':
          title = '关于'
          break
        default:
          title = '饭否每日精选·日历'
          break
      }

      document.title = title + ' - 饭否每日精选'
    })
    
  })
  return r
}
