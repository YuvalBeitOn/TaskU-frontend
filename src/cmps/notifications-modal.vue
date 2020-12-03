<template>
  <section class="notifications-modal">
    <header class="header-notifs">
      <h3 class="notifs-title">Notifications</h3>
      <notifs-filters @setFilter="setFilter"></notifs-filters>
    </header>
    <ul class="notifs-list flex column">
      <notif-preview
        v-for="(notif, idx) in currList"
        :key="idx"
        :notif="notif"
      />
    </ul>
  </section>
</template>

<script>
import notifsFilters from './notifs-filters'
import notifPreview from './notif-preview'

export default {
  components: {
    notifsFilters,
    notifPreview
  },
  data() {
    return {
      currList: null,
      filterBy: null
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setFilter(notifs) {
      console.log('notifs:', notifs);
    }
  }
}
</script>

<style></style>
