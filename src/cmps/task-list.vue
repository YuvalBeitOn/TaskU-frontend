<template>
  <section v-if="clonedTasks" class="task-list width100">
    <ul class="clean-list flex wrap align-center justify-center gap">
      <draggable class="width100" v-model="clonedTasks" @end="updateTasks">
        <task-preview
          v-for="task in clonedTasks"
          :user="loggedInUser"
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
      </draggable>
    </ul>
    <form class="flex" @submit.prevent="addTask">
      <span class="task-color" :style="taskBgc"></span>
      <input
        class="add-task-input "
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
import draggable from 'vuedraggable'
// import { eventBus } from '@/services/event-bus.service'

export default {
  name: 'task-list',
  props: {
    tasks: Array,
    groupId: String,
    taskColor: String
  },
  data() {
    return {
      txt: '',
      isAddBtnShowen: false,
      clonedTasks: null
    }
  },

  computed: {
    board() {
      return this.$store.getters.board
    },
    loggedInUser() {
      return this.$store.getters.user
    },
    taskBgc() {
      return { backgroundColor: this.taskColor }
    }
  },
  methods: {
    addEmptyTask(groupId) {
      console.log(groupId, this.groupId);
      if (this.groupId !== groupId) {
        console.log('add empty task returnnnn');
        return
      }
      const newTask = boardService.getEmptyTask()
      console.log('new task:', newTask)

      const group = this.getGroupById()
      group.tasks.push(newTask)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$emit('forceRender')
    },
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
      const newTask = boardService.getEmptyTask()
      newTask.txt = this.txt
      const txt = `Task '${newTask.txt}' added`
      let newActivity = boardService.getEmptyActivity(txt, this.loggedInUser)
      newTask.activities.push(newActivity)
      const group = this.getGroupById()
      group.tasks.push(newTask)
      console.log('new task:', newTask)
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
    },
    updateTasks() {
      const group = this.getGroupById()
      group.tasks = this.clonedTasks
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$emit('forceRender')
    }
  },
  components: {
    taskPreview,
    draggable
  },
  created() {
    console.log('task list created');
    this.clonedTasks = JSON.parse(JSON.stringify(this.tasks))
    // eventBus.$on('addEmptyTask', console.log)
  }
}
</script>
