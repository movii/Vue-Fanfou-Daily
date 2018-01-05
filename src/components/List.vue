<template>
  <div v-if="statuses">
    <ul class="status-list">
      <router-link v-for="status in statuses"
                   :key="status.stautsid"
                   :to="'/status/' + status.statusid"
                   tag="li"
                   class="status-link">
        <item :status="status" />
      </router-link>
    </ul>
  </div>
</template>

<script>
const Item = () => import(
  /* webpackChunkName: "Calendar" */
  './Item.vue'
)

export default {
  name: 'status-list',

  components: {
    Item
  },

  props: {
    statuses: {
      type: Array,
      default: null
    }
  },

  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.status-link {
  transition:
    background .3s ease-out,
    color .2s ease-in-out;
}
.status-link:hover {
  background: #f9fafc;
  cursor: pointer;
}
</style>
