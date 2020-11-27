<template>
  <li
    v-if="taskCopy"
    class="task-preview flex space-between align-center width100"
  >
    <!-- <button @click="deleteTask">X</button> -->
    <span class="task-txt" @blur="updateTaskTxt"  @keyup.enter="updateTaskTxt" contenteditable>{{
      taskCopy.txt
    }}</span>
    <div class="task-details flex">
      <span @click="sendToTaskDetails"
        ><i class="far fa-comment fa-icon"></i
      ></span>
      <div class="headers flex">
        <span><i class="far fa-user-circle fa-icon"></i></span>
        <span
          @click="toggleStatuses"
          class="status relative"
          :style="getStyleStr(taskCopy.status.color)"
          >{{ taskCopy.status.txt }}
          <label-picker
            v-if="isStatusesShowen"
            :opts="statuses"
            type="status"
            @updateTaskStatus="updateTaskStatus"
        /></span>
        <span
          @click="togglePriors"
          class="priority relative"
          :style="getStyleStr(taskCopy.priority.color)"
          >{{ taskCopy.priority.txt }}
          <label-picker
            v-if="isPriorsShowen"
            :opts="priorities"
            type="priority"
            @updateTaskPriority="updateTaskPriority"
        /></span>
        <label class="date-label" for="date">
          <input
            @change="updateTask"
            id="date"
            class="date-input"
            name="date"
            type="date"
            v-model="taskCopy.dueDate"
          />
        </label>
      </div>
    </div>
  </li>
</template>

<script>
import { eventBus } from '@/services/event-bus.service'
import labelPicker from './label-picker'
export default {
  components: { labelPicker },
  name: 'task-preview',
  data() {
    return {
      taskCopy: null,
      isStatusesShowen: false,
      isPriorsShowen: false
    }
  },
  props: {
    task: Object,
    statuses: Array,
    priorities: Array
  },
  methods: {
    getStyleStr(colorStr) {
      return `backgroundColor:${colorStr}`
    },
    toggleStatuses() {
      this.isStatusesShowen = !this.isStatusesShowen
    },
    methods: {
        toggleStatuses() {
            this.isStatusesShowen = !this.isStatusesShowen
        },
        togglePriors() {
            this.isPriorsShowen = !this.isPriorsShowen
        },
        deleteTask() {
            this.$emit('deleteTask', this.task.id)
        },
        updateTaskTxt(ev) {
            console.log(ev.target.innerText)
            this.taskCopy.txt = ev.target.innerText
            this.updateTask()
        },
        updateTask() {
            this.$emit('updateTask', this.taskCopy)
        },
        sendToTaskDetails() {
            if (
                this.$route.params.taskId &&
                this.$route.params.taskId === this.task.id
            ) {
                return
            }
            eventBus.$emit('taskDetails', this.task)
            this.$router.push(
                `/board/task/${this.task.id}`
            )
        },
    },
    deleteTask() {
      this.$emit('deleteTask', this.task.id)
    },
    updateTaskPriority(opt) {
      this.taskCopy.priority = opt
      this.updateTask()
    },
    updateTaskStatus(opt) {
      this.taskCopy.status = opt
      this.updateTask()
    },
    updateTaskTxt(ev) {
      console.log(ev.target.innerText)
      this.taskCopy.txt = ev.target.innerText
      this.updateTask()
    },
    updateTask() {
      this.$emit('updateTask', this.taskCopy)
    },
    sendToTaskDetails() {
      if (
        this.$route.params.taskId &&
        this.$route.params.taskId === this.task.id
      ) {
        return
      }
      eventBus.$emit('taskDetails', this.task)
      this.$router.push(`/board/${this.$route.params.boardId}/${this.task.id}`)
    }
  },
  created() {
    this.taskCopy = this.task
  }
}
</script>
