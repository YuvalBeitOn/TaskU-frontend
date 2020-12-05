<template>
  <section
    :style="`background-color:${status.color}`"
    class="status-preview flex align-center"
  >
    <span class="status-title"
      >{{ status.txt || 'No label' }}
      <span v-if="status.tasks">/ {{ status.tasks.length }}</span></span
    >

    <task-preview
      v-for="task in status.tasks"
      :key="task.id"
      :task="task"
      :group="group"
      @updateTask="updateTask"
    />
    <form class="add-task-form flex align-center" @submit.prevent="addTask">
      <input
        class="add-task-input"
        v-model="txt"
        type="text"
        placeholder="+ Add Task"
        @click="focusInput"
        @blur="unFocusInput"
      />
      <button type="submit" class="add-btn" v-if="isAddBtnShown">
        <span>+</span>
      </button>
    </form>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
import { eventBus } from '@/services/event-bus.service'
import { boardService } from '../../services/board.service'

export default {
  name: 'statues-preview',
  props: {
    status: Object,
    group: Object
  },
  data() {
    return {
      txt: '',
      isAddBtnShown: false
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
    updateTask(updatedTask) {
      console.log('taskkkkkkk:', updatedTask)
      const group = this.board.groups.find(group => group.id === updatedTask.groupId)
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
  },
  components: {
    taskPreview
  }
}
</script>
