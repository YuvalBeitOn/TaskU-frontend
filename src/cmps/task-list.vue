<template>
  <section v-if="tasks" class="task-list width100">
    <ul class="clean-list flex wrap align-center justify-center gap">
      <task-preview
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :statuses="board.statuses"
        :priorities="board.priorities"
        @deleteTask="deleteTask"
        @updateTask="updateTask"
      />
    </ul>
    <form class="flex" @submit.prevent="addTask">
      <input
        class="add-task-input"
        @focus="showAddBtn"
        v-model="txt"
        type="text"
        placeholder="+ Add Task"
      />
      <button v-show="isAddBtnShowen" type="submit">
        Add
      </button>
    </form>
  </section>
</template>

<script>
<<<<<<< HEAD
import taskPreview from '@/cmps/task-preview'
import { boardService } from '@/services/board.service'
=======
import taskPreview from '@/cmps/task-preview.vue'
import boardService from '@/services/board.service.js'
>>>>>>> 1aafa4a11112f79d44c1d7366eb2e8e243c2d3f2

export default {
  name: 'task-list',
  data() {
    return {
      txt: '',
      isAddBtnShowen: false
    }
  },
  props: {
    tasks: Array,
    groupId: String,

  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
    showAddBtn() {
      this.isAddBtnShowen = true
    },
    getGroupById() {
      const idx = this.board.groups.findIndex(
        group => group.id === this.groupId
      )
      return this.board.groups[idx]
    },
    addTask() {
      console.log('kkkkkkkkk')
      const newTask = boardService.getEmptyTask()
      newTask.txt = this.txt
      const group = this.getGroupById()
      group.tasks.push(newTask)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.txt = ''
      this.isAddBtnShowen = false
    },
    deleteTask(taskId) {
      const group = this.getGroupById()
      const taskIdx = group.tasks.findIndex(task => task.id === taskId)
      group.tasks.splice(taskIdx, 1)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    },
    updateTask(newTask) {
      const group = this.getGroupById()
      const taskIdx = group.tasks.findIndex(task => task.id === newTask.id)
      group.tasks.splice(taskIdx, 1, newTask)
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
