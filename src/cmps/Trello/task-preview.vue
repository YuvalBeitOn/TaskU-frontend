<template>
  <li
    class="task-preview-card flex"
    @mouseover="showBtns"
    @mouseleave="hideBtns"
  >
    <div class="task-preivew-header flex space-between relative width100">
      <div class="task-txt">
        <span
          class="editable txt-edit"
          spellcheck="false"
          @blur="updateTaskTxt"
          @keydown.enter="updateTaskTxt"
          contenteditable
          >{{ taskCopy.txt }}</span
        >
      </div>
    </div>
    <div
      class="btns-control flex column space-between align-center"
      v-if="isHovering"
    >
      <avatar :user="user" :size="20" />
      <button class="delete-btn" @click="deleteTask">
        <i class="fas fa-trash delete-icon"></i>
      </button>
      <button class="details-btn" @click.stop="openTaskDetails">
        <i class="fas fa-file-alt details-icon"></i>
      </button>
    </div>
    <task-details
      :task="taskCopy"
      :group="group"
      v-if="isTaskDetailsShown"
      :isTaskDetailsShown="isTaskDetailsShown"
    />
  </li>
</template>

<script>
import Avatar from '@/cmps/user-avatar.vue'
import taskDetails from './task-details'

export default {
  name: 'task-preview',
  components: {
    Avatar,
    taskDetails,
  },
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      isTaskDetailsShown: false,
      isHovering: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    hideBtns() {
      this.isHovering = false
    },
    showBtns() {
      this.isHovering = true
    },
    deleteTask() {
      this.$emit('deleteTask', this.taskCopy)
    },
    updateTaskTxt(ev) {
      ev.target.blur()
      if (ev.target.innerText === this.taskCopy.txt) return
      else {
        this.taskCopy.txt = ev.target.innerText
        this.$notify({
          message: 'Task txt updated',
          position: 'bottom-left',
          duration: 2000,
        })
        this.$emit('updateTask', this.taskCopy)
      }
    },
    openTaskDetails() {
      this.isTaskDetailsShown = true
    },
  },
  created() {
    this.taskCopy = this.task
  },
}
</script>
