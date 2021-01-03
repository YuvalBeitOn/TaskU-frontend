<template>
  <section class="trello flex wrap align-center">
    <div class="status-container">
      <status-list :statuses="tasksByStatues" :group="group" />
    </div>
  </section>
</template>

<script>
import statusList from './status-list'
export default {
  name: 'Trello-mode',
  data() {
    return {
      group: null
    }
  },
  computed: {
    tasksByStatues() {
      return JSON.parse(JSON.stringify(this.$store.getters.tasksByStatues))
    },
    board() {
      return this.$store.getters.board
    }
  },
  components: {
    statusList
  },
  created() {
    let group = this.board.groups[this.board.groups.length - 1]
    this.group = group
  }
}
</script>
