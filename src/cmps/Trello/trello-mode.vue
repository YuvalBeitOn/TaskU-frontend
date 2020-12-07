<template>
  <section class="trello flex wrap align-center">
    <div class="status-container">
      <status-list :statuses="tasksByStatues" :group="group" />
    </div>
  </section>
</template>

<script>
// import { boardService } from '../../services/board.service'
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
      return this.$store.getters.tasksByStatues
    },
    board() {
      return this.$store.getters.board
    }
  },
  components: {
    statusList
  },
  created() {
    // let newGroup = boardService.getEmptyGroup()
    // delete newGroup.tasks
    // newGroup.tasks = []
    // this.group = newGroup
    // this.board.groups.unshift(this.group)
    // this.$store.dispatch({
    //   type: 'saveBoard',
    //   board: this.board
    // })
    let group = this.board.groups[this.board.groups.length-1]
    this.group = group
  }
}
</script>
