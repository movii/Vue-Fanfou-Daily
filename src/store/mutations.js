export default {
  SET_ENTIRES (state, data) {
    state.entries = data
  },

  SET_CALENDAR (state, data) {
    state.calendar = data
  },

  SET_DAYS (state, data) {
    state.days = data
  },

  SET_TODAY (state, data) {
    state.today = data
  },

  SET_DAILY (state, { day, statuses }) {
    state.dailys[day] = statuses
  },

  SET_STATUS (state, status) {
    state.statuses[status.statusid] = status
  },

  SET_STATUSES (state, { day, statuses }) {
    state.dailys[day] = statuses
    statuses.forEach(status => {
      state.statuses[status.statusid] = status
    })
  }
}