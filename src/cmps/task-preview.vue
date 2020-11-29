<template>
  <li
    v-if="taskCopy"
    class="task-preview flex space-between align-center width100"
  >
    <div class="flex space-between align-center width100">
      <span class="task-color" :style="taskBgc"></span>
      <button class="btn-close" @click="deleteTask">X</button>

      <div class="task-txt">
        <span
          @blur="updateTaskTxt"
          @keyup.enter="updateTaskTxt"
          contenteditable
          >{{ taskCopy.txt }}</span
        >
      </div>

      <i @click="sendToTaskDetails" class="far fa-comment fa-icon"></i>
    </div>
    <div class="task-details flex">
      <div class="headers flex">
        <span
          ><i
            @click.stop="openMemberPopup"
            class="far fa-user-circle fa-icon"
          ></i
        ></span>

        <add-members
          v-if="isTaskMembersShowen"
          firstTitle="Task Members"
          secondTitle="Board Members"
          :members="taskCopy.members"
          :allMembers="filteredBoardMembers"
          @addMember="addTaskMember"
          @removeMember="removeTaskMember"
        />
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

        <span class="date-picker">
          <el-date-picker
            class="date-input"
            @change="updateTask"
            v-model="taskCopy.dueDate"
            type="date"
            placeholder="Pick a date"
          >
          </el-date-picker>
        </span>
      </div>
    </div>
    <div
      class="back-drop-layer"
      v-if="isTaskMembersShowen || isStatusesShowen || isPriorsShowen"
      @click.stop="closePopups"
    ></div>
  </li>
</template>
<script>
import addMembers from '@/cmps/add-members'
import { eventBus } from '@/services/event-bus.service'
import labelPicker from './label-picker'
import { boardService } from '@/services/board.service'
export default {
  components: { labelPicker, addMembers },
  name: 'task-preview',
  data() {
    return {
      taskCopy: null,
      isStatusesShowen: false,
      isPriorsShowen: false,
      isTaskMembersShowen: false,
    }
  },
  props: {
    taskColor: String,
    task: Object,
    statuses: Array,
    priorities: Array,
    groupId: String,
    boardMembers: [Array, Object],
    activity: Object,
    user: Object,
  },
  computed: {
    taskBgc() {
      return { backgroundColor: this.taskColor }
    },
    filteredBoardMembers() {
      const boardMembers = this.boardMembers
      const taskMembers = this.taskCopy.members
      if (taskMembers) {
        const filteredBoardMembers = boardMembers.filter((bMember) => {
          return taskMembers.every((tMember) => {
            return tMember._id !== bMember._id
          })
        })
        return filteredBoardMembers
      } else {
        return boardMembers
      }
    },
  },
  methods: {
    openMemberPopup() {
      this.isTaskMembersShowen = true
    },
    toggleMember() {
      this.isTaskMembersShowen = !this.isTaskMembersShowen
    },
    addTaskMember(member) {
      let newActivity = boardService.getEmptyActivity()
      this.taskCopy.members.unshift(member)
      newActivity.txt = `Member ${member.fullName} was added to task`
      newActivity.byUser = this.user
      this.taskCopy.activities.push(newActivity)
      this.updateTask()
    },
    removeTaskMember(member) {
      const idx = this.taskCopy.members.findIndex(
        (tMember) => tMember._id === member._id
      )
      let newActivity = boardService.getEmptyActivity()
      this.taskCopy.members.splice(idx, 1)
      newActivity.txt = `Member ${member.fullName} was removed from task`
      newActivity.byUser = this.user
      this.taskCopy.activities.push(newActivity)
      this.updateTask()
    },
    getStyleStr(colorStr) {
      return `backgroundColor:${colorStr}`
    },
    toggleStatuses() {
      this.isStatusesShowen = !this.isStatusesShowen
    },
    togglePriors() {
      this.isPriorsShowen = !this.isPriorsShowen
    },
    deleteTask() {
      this.$emit('deleteTask', this.taskCopy.id)
    },
    updateTaskTxt(ev) {
      let newActivity = boardService.getEmptyActivity()
      const prevTxt = this.taskCopy.txt
      this.taskCopy.txt = ev.target.innerText
      newActivity.txt = `Task '${prevTxt}' was changed to '${ev.target.innerText}'`
      newActivity.byUser = this.user
      this.taskCopy.activities.push(newActivity)
      this.updateTask()
    },
    updateTask() {
      this.$emit('updateTask', this.taskCopy)
    },
    sendToTaskDetails() {
      if (this.$route.params.taskId === this.task.id) {
        return
      }
      this.$router.push(
        `/board/${this.$route.params.boardId}/task/${this.task.id}`
      )
    },
    updateComponentTask(task) {
      if (this.taskCopy.id === this.$route.params.taskId) {
        this.taskCopy = task
      }
    },
    updateTaskPriority(opt) {
      console.log('opt:', opt)
      let newActivity = boardService.getEmptyActivity()
      const prevPrior = this.taskCopy.priority.txt
      this.taskCopy.priority.txt = opt.txt
      this.taskCopy.priority.color = opt.color
      console.log('prevPrior:', prevPrior)
      newActivity.txt = `Task priority was updated from ${prevPrior} to '${opt.txt}'`
      newActivity.byUser = this.user
      this.taskCopy.activities.push(newActivity)
      this.updateTask()
      this.isPriorsShowen = false
    },
    updateTaskStatus(opt) {
      let newActivity = boardService.getEmptyActivity()
      const prevStatus = this.taskCopy.status.txt
      this.taskCopy.status.txt = opt.txt
      this.taskCopy.status.color = opt.color
      newActivity.txt = `Task status was updated from ${prevStatus} to '${opt.txt}'`
      newActivity.byUser = this.user
      this.taskCopy.activities.push(newActivity)
      this.updateTask()
      this.isPriorsShowen = false
    },
    closePopups() {
      this.isTaskMembersShowen = false
      this.isStatusesShowen = false
      this.isPriorsShowen = false
    },
  },
  created() {
    eventBus.$on('updateTaskPreview', this.updateComponentTask)
    this.taskCopy = this.task
  },
}
</script>