<template>
  <div>
    <div v-if="!statuses" class="loading">loading...</div>
    <div v-else>
      <status-list :statuses="statuses"/>
    </div>
  </div>
</template>

<script>
const StatusList = () => import(
  /* webpackChunkName: "Calendar" */
  '../components/List.vue'
)

export default {
  name: 'day',

  components: {
    StatusList
  },

  data () {
    return {
      statuses: null
    }
  },

  beforeMounted () {
    this.loadStatuses()
  },

  created () {
    this.loadStatuses()
  },

  beforeRouteUpdate (to) {
    this.loadStatuses(to)
  },

  methods: {
    loadStatuses (to = null) {
      let target = to
        ? to.params.day
        : this.$route.params.day
      this.statuses = null
      this.$store
        .dispatch('FETCH_DAILY', { day: target })
        .then(statuses => {
          // if /day/:day responds with no data
          // such as /day/123,
          // redirect to /day/today
          if (statuses && statuses.length) {
            this.statuses = statuses
          }
          else {
            this.$router.replace({ path: '/day', params: { day: 'today' }})
          }
        })
    }
  }
}
</script>

<style>

</style>
