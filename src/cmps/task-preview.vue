<template>
  <li
    v-if="taskCopy"
    class="task-preview flex space-between align-center width100"
  >
    <div class="flex space-between align-center width100">
      <span class="task-color" :style="taskBgc"></span>
      <button class="btn-close" @click="deleteTask">
        <i v-tooltip.top="'Delete Task'" class="task-icon btn-trash fa-icon far fa-trash-alt"></i>
      </button>

      <div class="task-txt">
        <span
          class="editable"
          @blur="updateTaskTxt"
          @keydown.enter="updateTaskTxt"
          contenteditable
          >{{ taskCopy.txt }}</span
        >
      </div>
      <el-badge
        :hidden="postsLegnth"
        :value="task.posts.length"
        class="item"
        type="primary"
      >
        <i
          @click="sendToTaskDetails"
          v-tooltip.top="'Task Details'"
          :style="postosColorBtn" class="task-icon far fa-comment fa-icon"
        ></i>
      </el-badge>
    </div>
    <div class="task-details flex">
      <div class="headers flex">
        <span>
          <el-badge
            :hidden="membersLegnth"
            :value="task.members.length"
            class="item"
            type="primary"
          >
            <i
              @click.stop="toggleMember"
              v-tooltip.top="'Task Members'"
              class="task-icon far fa-user-circle fa-icon"
            ></i>
          </el-badge>
        </span>

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
          <el-date-picker v-tooltip.top="'Due Date'"
            class="date-input"
            @change="updateTaskDate"
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
import moment from 'moment'

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
    postsLegnth() {
      return this.task.posts.length > 0 ? false : true
    },
    postosColorBtn(){
    return this.task.posts.length > 0 ? 'color: #0085ff;': ''
    },
    membersLegnth() {
      return this.task.members.length > 0 ? false : true
    },
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
    updateTaskDate() {
      const date = moment(this.taskCopy.dueDate).format('ll')
      const txt = `Task due date was changed to ${date}`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      this.taskCopy.activities.push(newActivity)
      eventBus.$emit('updateBoardActivity', newActivity)
      this.$notify({
          message: 'Update task date',
          position: 'bottom-left',
          duration:2000,
        });

      this.updateTask()
    },
    toggleMember() {
      this.isTaskMembersShowen = !this.isTaskMembersShowen
    },
    addTaskMember(member) {
      const txt = `Member ${member.fullName} was added to task`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      this.taskCopy.members.unshift(member)
      this.taskCopy.activities.push(newActivity)
       eventBus.$emit('updateBoardActivity', newActivity)
      this.$notify({
          message: 'Update task member',
          position: 'bottom-left',
          duration:2000,
        });
      this.updateTask()
    },
    removeTaskMember(member) {
      const idx = this.taskCopy.members.findIndex(
        (tMember) => tMember._id === member._id
      )
      const txt = `Member ${member.fullName} was removed from task`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      this.taskCopy.members.splice(idx, 1)
      this.taskCopy.activities.push(newActivity)
       eventBus.$emit('updateBoardActivity', newActivity)
      this.$notify({
          message: 'Update task member',
          position: 'bottom-left',
          duration:2000,
        });
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
      const prevTxt = this.taskCopy.txt
      this.taskCopy.txt = ev.target.innerText
      const txt = `Task '${prevTxt}' was changed to '${ev.target.innerText}'`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      this.taskCopy.activities.push(newActivity)
       eventBus.$emit('updateBoardActivity', newActivity)
      this.$notify({
          message: 'Update task name',
          position: 'bottom-left',
          duration:2000,
        });
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
      const txt = `Task priority was updated to ${opt.txt}`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      // const prevPrior = this.taskCopy.priority.txt
      this.taskCopy.priority.txt = opt.txt
      this.taskCopy.priority.color = opt.color
      this.taskCopy.activities.push(newActivity)
       eventBus.$emit('updateBoardActivity', newActivity)
      this.$notify({
          message: 'Update task priority',
          position: 'bottom-left',
          duration:2000,
        });
      this.updateTask()
      this.isPriorsShowen = false
    },
    updateTaskStatus(opt) {
      const txt = `Task status was updated to ${opt.txt}`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      // const prevStatus = this.taskCopy.status.txt
      this.taskCopy.status.txt = opt.txt
      this.taskCopy.status.color = opt.color
      this.taskCopy.activities.push(newActivity)
             eventBus.$emit('updateBoardActivity', newActivity)
      this.$notify({
          message: 'Update task status',
          position: 'bottom-left',
          duration:2000,
        });
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
