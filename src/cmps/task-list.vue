<template>
  <section v-if="tasks" class="task-list width100">
    <ul class="clean-list flex wrap align-center justify-center gap">
      <task-preview v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
    <form action="">
      <input v-model="this.txt" type="text" placeholder="+ Add Task" />
    </form>
  </section>
</template>

<script>
import taskPreview from '@/cmps/task-preview.vue'
import boardService from '@/services.board.service.js'

export default {
  name: 'task-list',
  data() {
    return {
      txt: ''
    }
  },
  props: {
    tasks: Array,
    groupId: String
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
    addTask() {
      const newTask = boardService.getEmptyTask()
      newTask.txt = this.txt
      const group = this.board.groups.findIndex(group => group.id === this.groupId)
      group.push(newTask)
      this.board.groups.push(group)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    }
  },
  components: {
    taskPreview
  }
}
</script>
