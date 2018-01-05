import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      entries: [/* an indexed array of all days which has fanfou-daliy data*/],
      statuses: {/* statusid: { ... status detail ... } */},
      days: [],
      dailys: {},
      today: null
    },
    actions,
    mutations
  })
}