<template>
  <div>
     <div class="" v-if="isLoading">
      loading...
    </div>
    <!-- <div class="entry-date">{{date}}</div> -->

    <div v-for="status in statuses"  class="status" v-bind:key="status.id">
          
      <div class="status-meta">
        <div class="status-meta__user">
          <img :src="status.avatar">
          <div>{{status.realname}}</div>
        </div>
        <div class="status-meta__timestamp">
          {{status.time}}
        </div>
      </div>

      <div class="status__text" v-html="status.msg"></div>
      <img v-if="status.img.preview" :src="status.img.preview" class="status__image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',

  data () {
    return {
      isLoading: true,
      statuses: []
    }
  },

  watch: {
    '$route': 'fetchList'
  },

  mounted () {
    //this.calendar = this.$store.getters.calendar
  },

  beforeRouteEnter (to, from, next) {
    next($this => $this.fetchList())
  },

  methods: {
    fetchList () {
      let day = this.$route.params.day
        , isToday = day === 'today' ? true : false

      console.log(day)

      this.$store.dispatch('FETCH_INDEX').then(({calendar, days, today}) => {
        this.$store.dispatch('FETCH_DAILY', { day: isToday ? today : day }).then(data => {
          this.statuses = data.msgs;
          this.isLoading = false
        })
      })
    }
  }
}
</script>

<style lang="scss">
.entry-date {
  background: #F8F8F8;
  color: #96999B;
  height: 20px;
  overflow: hidden;
  line-height: 20px;
  width: 100%;
  font-size: .7rem;
  padding: 0 .65rem;
  box-sizing: border-box;
}

.status {
  margin: 0 auto;
  padding: .65rem 0;
  font-size: 1rem; 
  word-break: break-all;
  white-space: normal;
  line-height: 1.25rem;
  max-width: 90%;
  user-select: auto;
  border-bottom: 1px solid #f1f1f1;
}

.status-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-meta .status-meta__user {
  flex: 2;
  display: flex;
  align-items: center;
}

.status-meta .status-meta__user img {
  width: 25px;
  height: 25px;
  margin-right: .625rem;
  border-radius: 50%;
  border: 1px solid #cccccc;
}

.status-meta .status-meta__user view {
 font-size: .9rem;
}

.status-meta__timestamp {
  flex: 1.5;
  font-size: .75rem;
  color: #999999;
  text-align: right;
}

.status .status__text {
  padding: .65rem 0 0 0;
  box-sizing: border-box;
  line-height: 1.75rem;
  font-size: 1.125rem;
  text-align: left;
  margin-bottom: .325rem;

  & > a[href^="/q/"] {
    pointer-events: none;
  }
}

.status .status__image {
  width: 90%;
  display: block;
  margin: .325rem auto 0;
}
</style>


