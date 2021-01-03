<template>
  <section v-if="boardActivitesToShow" class="board-activities">
    <side-bar @closeBtn="closeBtn">
      <main class="main-container flex column wrap ">
        <div class="header-activites">
          <h2 class="title">Board Activities</h2>
          <h4 class="activity-title">{{ boardActivitesTitle }}</h4>
        </div>
        <div class="filter-container flex space-between">
          <search-activity @searchBoard="setSearch" />
          <button class="delete-all-btn" @click="deleteActivities">Delete All</button>
        </div>
        <div class="activity-contianer">
          <activites-board v-if="boardActivitesToShow"
            :activities="boardActivitesToShow"
            @deleteActivity="deleteActivity"
          />
        </div>
      </main>
    </side-bar>
  </section>
</template>

<script>
import searchActivity from '@/cmps/board-search'
import sideBar from '@/cmps/sidebar.vue'
import activitesBoard from '@/cmps/task-activities'
export default {
  name: 'board-activities',
  components: { sideBar, activitesBoard, searchActivity },
  data() {
    return {
      filterBy: null
    }
  },
  computed: {
    boardActivitesToShow() {
      const activities = this.$store.getters.boardActivities
      if (!this.filterBy) return activities
      return activities.filter(actvt =>
        actvt.txt.toLowerCase().includes(this.filterBy.toLowerCase())
      )
    },
    boardActivitesTitle() {
      return this.boardActivitesToShow.length
        ? this.boardActivitesToShow.length + ' Activities on the Board'
        : 'Not have  activities yet..'
    },
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
    deleteActivity(activityId) {
      const activityIdx = this.board.activities.findIndex(
        activity => activity.id === activityId
      )
      this.board.activities.splice(activityIdx, 1)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    },
    deleteActivities() {
      this.board.activities = []
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    },
    closeBtn() {
      this.$router.push(`/board/${this.$route.params.boardId}`)
    },
    setSearch(searchKeys) {
      this.filterBy = searchKeys
    }
  }
}
</script>

<style></style>
