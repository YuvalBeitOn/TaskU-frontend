<template>
  <section
    :style="`background-color:${status.color}`"
    class="status-preview flex align-center"
  >
    <span class="status-title">{{ status.txt || 'No label' }}</span>
    <task-preview
      v-for="task in status.tasks"
      :key="task.id"
      :task="task"
      :group="group"
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
      <button class="add-btn" v-if="isAddBtnShown" ><span>+</span></button>
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
    status: Object
  },
  data() {
    return {
      txt: '',
      group: null,
      isAddBtnShown: false
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
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
  components: {
    taskPreview
  },
  created() {
    let newGroup = boardService.getEmptyGroup()
    delete newGroup.tasks
    newGroup.tasks = []
    this.group = newGroup
    this.board.groups.unshift(this.group)
    this.$store.dispatch({
      type: 'saveBoard',
      board: this.board
    })
  }
}
</script>
