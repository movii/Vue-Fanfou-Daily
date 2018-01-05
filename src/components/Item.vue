<template>
  <div class="status">
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
  </div>
</template>

<script>
export default {
  name: 'status-item',
  props: {
    status: {
      type: String|Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
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
  width: 95%;
  display: block;
  margin: 1rem auto;
}
</style>
