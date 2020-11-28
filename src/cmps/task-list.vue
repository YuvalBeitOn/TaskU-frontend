<template>
  <section class="task-list width100">
    <ul  v-if="tasks.length" class="clean-list flex wrap align-center justify-center gap">
      <task-preview
        v-for="task in tasks"
        :user="user"
        :taskColor="taskColor"
        :key="task.id"
        :task="task"
        :statuses="board.statuses"
        :priorities="board.priorities"
        :groupId="groupId"
        @deleteTask="deleteTask"
        @updateTask="updateTask"
        :boardMembers="board.members"
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
      <button v-show="isAddBtnShowen" type="submit">Add</button>
    </form>
  </section>
</template>

<script>
import taskPreview from './task-preview'
import { boardService } from '@/services/board.service'

export default {
  name: 'task-list',
  data() {
    return {
      txt: '',
      isAddBtnShowen: false
      // activity: null
    }
  },
  props: {
    tasks: Array,
    groupId: String,
    taskColor: String
  },

  computed: {
    board() {
      return this.$store.getters.board
    },
    user() {
      return this.$store.getters.loggedInUser
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
      let newActivity = boardService.getEmptyActivity()
      const newTask = boardService.getEmptyTask()
      newTask.txt = this.txt
      newActivity.txt = `Task '${newTask.txt}' added`
      newActivity.byUser = this.user
      newTask.activities.push(newActivity)
      const group = this.getGroupById()
      group.tasks.push(newTask)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.txt = ''
      this.isAddBtnShowen = false
      this.$emit('forceRender')
    },
    deleteTask(taskId) {
      const group = this.getGroupById()
      const taskIdx = group.tasks.findIndex(task => task.id === taskId)
      group.tasks.splice(taskIdx, 1)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$emit('forceRender')
    },
    updateTask(newTask) {
      const group = this.getGroupById()
      const taskIdx = group.tasks.findIndex(task => task.id === newTask.id)
      group.tasks.splice(taskIdx, 1, newTask)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$emit('forceRender')
    }
  },
  created() {
    console.log('tasks:', this.tasks)
  },
  components: {
    taskPreview
  }
}
</script>
