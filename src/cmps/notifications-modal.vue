<template>
  <section :class="{ 'notifications-modal': true, 'expanded': isExpanded }">
    <!-- <section class="notifications-modal"> -->
    <header class="header-notifs">
      <h3 class="notifs-title">Notifications</h3>
      <notifs-filters :setFilter="setFilter"></notifs-filters>
    </header>
    <ul v-if="notifsToShow.length" class="notifs-list flex column">
      <notif-preview
        v-for="notif in notifsToShow"
        :key="notif.id"
        :notif="notif"
        :user="user"
        :board="board"
        @updateNotif="updateNotif"
        @deleteNotif="deleteNotif"
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
  props: {
    isExpanded: Boolean
  },
  data() {
    return {
      filterBy: null,
      notifsCopy: null
      // expanded: null
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    notifsToShow() {
      let notifs = this.$store.getters.user.notifications
      switch (this.filterBy) {
        case 'unread':
          notifs = notifs.filter(notif => notif.isRead === false)
          break
        case 'assigned':
          notifs = notifs.filter(notif => notif.type === 'assigned')
          break
        case 'mentions':
          notifs = []
          break
      }
      return notifs
    },
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    updateNotif(notif) {
      const idx = this.notifsCopy.findIndex(
        currNotif => currNotif.id === notif.id
      )
      this.notifsCopy.splice(idx, 1, notif)
    },
    deleteNotif(notif) {
      const idx = this.notifsCopy.findIndex(
        currNotif => currNotif.id === notif.id
      )
      this.notifsCopy.splice(idx, 1)
      this.updateNotifs()
    },
    setFilter(filterStr) {
      this.filterBy = filterStr
      this.updateNotifs()
    },
    updateNotifs() {
      this.user.notifications = this.notifsCopy
      this.$store.dispatch({
        type: 'updateUser',
        user: this.user
      })
    }
  },
  destroyed() {
    this.updateNotifs()
  },
  created() {
    this.notifsCopy = this.$store.getters.user.notifications
    console.log(this.isExpanded);
    // this.expanded = this.isExpanded
  }
}
</script>

<style></style>
