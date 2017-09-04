import Calendar from '../utils/calendar'

export default {
  SET_CALENDAR (state, data) {
    state.calendar = data
  },

  SET_DAYS (state, data) {
    state.days = data
  },

  SET_TODAY (state, data) {
    state.today = data
  },

  SET_DAILY (state, { day, data }) {
    state.dailys[day] = data
  }
}