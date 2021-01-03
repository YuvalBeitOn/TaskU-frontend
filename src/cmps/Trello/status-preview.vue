<template>
  <ul
    :style="`background-color:${status.color}`"
    class="status-preview flex align-center clean-list status-list"
  >
    <span class="status-title"
      >{{ status.txt || 'Need to review' }}
      <span v-if="status.tasks">/ {{ status.tasks.length }}</span></span
    >
    <div class="tasks-preview-container align-center">
      <draggable
        class="width100 drag-canvan"
        :list="cloneTasks"
        group="tasks"
        @change="updateTaskStatus"
      >
        <task-preview
          v-for="task in cloneTasks"
          :key="task.id"
          :task="task"
          :group="group"
          @updateTask="updateTask"
          @deleteTask="deleteTask"
        />
      </draggable>
    </div>
    <div :style="onFocousBgc" class="input-container">
      <div class="add-task-form flex align-center space-between">
        <input
          class="add-task-input"
          v-model="txt"
          type="text"
          placeholder="+ Add Task"
          @click="focusInput"
          @blur="unFocusInput"
          @keypress.enter="addTask"
        />
        <button
          @click="addTask"
          :style="`background-color:${status.color}`"
          class="add-btn"
          v-if="isAddBtnShown"
        >
          + Add
        </button>
      </div>
    </div>
  </ul>
</template>

<script>
import taskPreview from './task-preview.vue'
import { eventBus } from '@/services/event-bus.service'
import { boardService } from '../../services/board.service'
import draggable from 'vuedraggable'

export default {
  name: 'statues-preview',
  props: {
    status: Object,
    group: Object
  },
  data() {
    return {
      txt: '',
      isAddBtnShown: false,
      cloneTasks: null
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    onFocousBgc() {
      return this.isAddBtnShown ? 'background-color:white;' : ''
    }
  },
  methods: {
    updateTaskStatus({ added }) {
      if (added) {
        const { newIndex } = added
        const idx = newIndex
        const task = this.status.tasks[idx]
        task.status.color = this.status.color
        task.status.txt = this.status.txt
        this.updateTask(task)
      }
    },
    deleteTask(task) {
      const group = this.board.groups.find(group => group.id === task.groupId)
      const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
      group.tasks.splice(taskIdx, 1)
      eventBus.$emit('updateGroup', group)
    },
    updateTask(updatedTask) {
      const group = this.board.groups.find(
        group => group.id === updatedTask.groupId
      )
      const taskIdx = group.tasks.findIndex(
        currTask => currTask.id === updatedTask.id
      )
      group.tasks.splice(taskIdx, 1, updatedTask)
      eventBus.$emit('updateGroup', group)
    },
    focusInput() {
      this.isAddBtnShown = true
    },
    unFocusInput() {
      this.isAddBtnShown = false
    },
    addTask() {
      const newTask = boardService.getEmptyTask()
      newTask.status.color = this.status.color
      newTask.status.txt = this.status.txt
      newTask.txt = this.txt
      this.group.tasks.unshift(newTask)
      eventBus.$emit('updateGroup', this.group)
      this.isAddBtnShown = false
      this.txt = ''
    }
  },
  created() {
    this.groupCopy = this.group
    this.cloneTasks = this.status.tasks
  },
  components: {
    taskPreview,
    draggable
  }
}
</script>
