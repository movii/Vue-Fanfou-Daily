import {
  fetchEntries,
  fetchDaily,
  fetchStatus
} from '../api'

export default {
  FETCH_ENTRIES ({ commit, state }) {
    return new Promise((resolve) => {
      return state.entries && state.entries.length
        ? resolve({
          entries: state.entries,
          today: state.today,
          days: state.days
        })
        : fetchEntries().then(data => {
          let entries = data
          let today = ([...entries].shift()).split('.')[0]
          let days = Object.keys(entries)

          commit('SET_ENTIRES', entries)
          commit('SET_TODAY', today)
          commit('SET_DAYS', days)

          resolve({
            entries,
            today,
            days
          })
        })
    })
  },

  FETCH_DAILY ({ commit, dispatch, state }, { day: day }) {
    return (day === 'today'
      ? dispatch('FETCH_ENTRIES').then(({ today }) => today)
      : Promise.resolve(day))
      .then(day => {
        return state.dailys[day]
          ? state.dailys[day]
          : fetchDaily(day)
            .then(statuses => {
              commit('SET_STATUSES', {
                day: day,
                statuses: statuses
              })
              return statuses
            })
      })
  },

  FETCH_STATUS({ commit, state }, { statusId }) {
    return state.statuses[statusId]
      ? state.statuses[statusId]
      : fetchStatus(statusId).then(status => {
        commit('SET_STATUS', status)
        return status
      })
  }
}