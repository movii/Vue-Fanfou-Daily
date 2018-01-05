<template>
  <div v-if="status" class="status-view">
    <div class="status-meta">
      <div class="status-meta__user">
        <img :src="status.avatar">
        <div>{{ status.realname }}</div>
      </div>
      <div class="status-meta__timestamp">
        {{ status.time }}
      </div>
    </div>
    <div class="status__text" v-html="status.msg"/>
    <template v-if="status.img && status.img.preview">
      <img :src="status.img.preview" class="status__image">
    </template>
    <div class="status-meta__count">
      收藏数：{{ status.count }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'stauts',

  data () {
    return {
      status: null
    }
  },

  beforeRouteEnter (to, from, next) {
    let statusId = to.params.statusId
    next($this => {
      $this.loadStatus(statusId)
    })
  },

  methods: {
    loadStatus (statusId) {
      this.$store.dispatch('FETCH_STATUS', { statusId: statusId })
        .then(status => {
          this.status = status
        })
    }
  }


}
</script>

<style lang="scss" scoped>
.status-view {
  padding: 1.5rem 0;
  box-sizing: border-box;
  max-width: 95%;
  margin: 0 auto;
}

.status {
  list-style: none;
  margin: 0 auto;
  padding: .65rem;
  font-size: 1rem; 
  word-break: break-all;
  white-space: normal;
  line-height: 1.25rem;
  max-width: 100%;
  user-select: auto;
  border-bottom: 1px solid #f1f1f1;
}

.status-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .65rem;
}

.status-meta .status-meta__user {
  flex: 2;
  display: flex;
  align-items: center;
}

.status-meta .status-meta__user img {
  width: 45px;
  height: 45px;
  margin-right: .625rem;
  border-radius: 50%;
  border: 1px solid #cccccc;
}

.status-meta .status-meta__user view {
 font-size: .9rem;
}

.status-meta__timestamp {
  flex: 1.5;
  font-size: .9rem;
  color: #999999;
  text-align: right;
}

.status-meta__count {
  width: 100%;
  font-size: .9rem;
  color: #999999;
  box-sizing: border-box;
  padding: .325rem 0;
  text-align: left;
}

.status-view .status__text {
  padding: .65rem 0 0 0;
  box-sizing: border-box;
  line-height: 2rem;
  font-size: 1.325rem;
  text-align: left;
  margin-bottom: .65rem;

  & > a[href^="/q/"] {
    pointer-events: none;
  }
}

.status-view .status__image {
  width: 100%;
  display: block;
  margin: .325rem auto 0;
}
</style>
