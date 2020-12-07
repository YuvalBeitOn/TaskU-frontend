<template>
  <li
    v-if="taskCopy"
    class="task-preview flex space-between align-center width100"
  >
    <div class="flex space-between align-center width100">
      <!-- <div class="flex"> -->
      <span class="task-color" :style="taskBgc"></span>
      <button class="btn-close" @click.stop="deleteTask">
        <i class="task-icon btn-trash fa-icon far fa-trash-alt"></i>
      </button>
      <div class="task-txt">
        <span
          class="editable"
          spellcheck="false"
          @blur="updateTaskTxt"
          @keydown.enter="updateTaskTxt"
          contenteditable
          >{{ taskCopy.txt }}</span
        >
      </div>
      <!-- </div> -->
      <el-badge
        :hidden="postsLegnth"
        :value="task.posts.length"
        class="item"
        type="primary"
      >
        <i
          @click.stop="sendToTaskDetails"
          v-tooltip.top="'Task Details'"
          :style="postosColorBtn"
          class="task-icon far fa-comment fa-icon"
        ></i>
      </el-badge>
    </div>
    <div class="task-details flex">
      <div class="headers flex">
        <span class="members-preview relative task-item">
          <members
            className="img-profile-preview"
            :hiddenBadge="membersLegnth"
            toolTipTxt="Task Members"
            classIcon="task-icon"
            :members="taskCopy.members"
          >
            <add-members
              class="top-left"
              slot="add-members"
              firstTitle="Task members"
              secondTitle="Board members"
              :members="taskCopy.members"
              :allMembers="filteredBoardMembers"
              @addMember="addTaskMember"
              @removeMember="removeTaskMember"
            />
          </members>
        </span>

        <span
          @click.stop="toggleStatuses"
          class="status relative task-item"
          :style="getStyleStr(taskCopy.status.color)"
          >{{ taskCopy.status.txt }}
          <label-picker
            v-if="isStatusesShowen"
            :opts="statuses"
            type="status"
            @updateTaskStatus="updateTaskStatus"
        /></span>

        <span
          @click.stop="togglePriors"
          class="priority relative task-item"
          :style="getStyleStr(taskCopy.priority.color)"
          >{{ taskCopy.priority.txt }}
          <label-picker
            v-if="isPriorsShowen"
            :opts="priorities"
            type="priority"
            @updateTaskPriority="updateTaskPriority"
        /></span>

        <span class="date-picker task-item">
          <el-date-picker
            v-tooltip.top="'Due Date'"
            class="date-input"
            @change="updateTaskDate"
            v-model="taskCopy.dueDate"
            type="date"
            placeholder="Pick a date"
          >
          </el-date-picker>
        </span>

        <!-- <span
          class="task-details-preview task-item"
          v-tooltip.top="'Details'"
          @change="openTaskDetails"
        >Details
        </span> -->
      </div>
    </div>
    <div
      class="back-drop-layer"
      v-if="isStatusesShowen || isPriorsShowen"
      @click.stop="closePopups"
    ></div>
  </li>
</template>
<script>
import { boardService } from '@/services/board.service'
import { userService } from '../services/user.service'
import { eventBus } from '@/services/event-bus.service'
import members from '@/cmps/members'
import addMembers from '@/cmps/add-members'
import labelPicker from './label-picker'
import moment from 'moment'
export default {
  components: { labelPicker, addMembers, members },
  name: 'task-preview',
  data() {
    return {
      taskCopy: null,
      isStatusesShowen: false,
      isPriorsShowen: false,
      activity: null
    }
  },
  props: {
    taskColor: String,
    task: Object,
    statuses: Array,
    priorities: Array,
    groupId: String,
    boardMembers: [Array, Object],
    user: Object
  },

  computed: {
    postsLegnth() {
      return this.task.posts.length > 0 ? false : true
    },
    postosColorBtn() {
      return this.task.posts.length > 0 ? 'color: #0085ff;' : ''
    },
    membersLegnth() {
      return this.task.members.length > 3 ? false : true
    },
    taskBgc() {
      return { backgroundColor: this.taskColor }
    },
    filteredBoardMembers() {
      const boardMembers = this.boardMembers
      const taskMembers = this.taskCopy.members
      if (taskMembers) {
        const filteredBoardMembers = boardMembers.filter(bMember => {
          return taskMembers.every(tMember => {
            return tMember._id !== bMember._id
          })
        })
        return filteredBoardMembers
      } else {
        return boardMembers
      }
    }
  },

  methods: {
    openTaskDetails() {
      return
    },
    updateTaskDate() {
      const date = moment(this.taskCopy.dueDate).format('ll')
      if (date === 'Invalid date') return
      this.taskCopy.members.forEach(member => {
        let newNotif = userService.getEmptyNotif()
        newNotif.txt = `Upadte task due date to "${date}"`
        newNotif.type = 'all'
        newNotif.byUser = {
          mail: this.user.email,
          imgUrl: this.user.imgUrl
        }
        newNotif.toUserId = member._id
        this.$store.dispatch({ type: 'sendNotif', notif: newNotif })
      })
      const txt = `Task due ${this.taskCopy.txt} date was changed to ${date}`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      newActivity.taskId = this.taskCopy.id
      this.activity = newActivity
      this.$notify({
        message: 'Task due date updated',
        position: 'bottom-left',
        duration: 2000
      })
      this.updateTask()
    },

    addTaskMember(member) {
      const txt = `Member ${member.fullName} was added to task`
      let newNotif = userService.getEmptyNotif()
      newNotif.txt = `assigned you to "${this.taskCopy.txt}"`
      newNotif.type = 'assigned'
      newNotif.byUser = {
        mail: this.user.email,
        imgUrl: this.user.imgUrl
      }
      newNotif.toUserId = member._id
      this.$store.dispatch({ type: 'sendNotif', notif: newNotif })
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      newActivity.taskId = this.taskCopy.id
      this.taskCopy.members.unshift(member)
      this.activity = newActivity
      this.$notify({
        message: 'Member assinged to task',
        position: 'bottom-left',
        duration: 2000
      })
      this.updateTask()
    },
    removeTaskMember(member) {
      let newNotif = userService.getEmptyNotif()
      newNotif.txt = `${this.user.fullName} took you off from task "${this.taskCopy.txt}"`
      newNotif.type = 'all'
      newNotif.byUser = {
        mail: this.user.email,
        imgUrl: this.user.imgUrl
      }
      newNotif.toUserId = member._id
      this.$store.dispatch({ type: 'sendNotif', notif: newNotif })
      const idx = this.taskCopy.members.findIndex(
        tMember => tMember._id === member._id
      )
      const txt = `Member ${member.fullName} was removed from task`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      newActivity.taskId = this.taskCopy.id
      this.taskCopy.members.splice(idx, 1)
      this.activity = newActivity
      this.$notify({
        message: 'Member removed from task',
        position: 'bottom-left',
        duration: 2000
      })
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
      ev.target.blur()
      if (ev.target.innerText === this.taskCopy.txt) return
      else {
        this.taskCopy.members.forEach(member => {
          let newNotif = userService.getEmptyNotif()
          newNotif.txt = `Upadte task content to "${ev.target.innerText}"`
          newNotif.type = 'all'
          newNotif.byUser = {
            mail: this.user.email,
            imgUrl: this.user.imgUrl
          }
          newNotif.toUserId = member._id
          this.$store.dispatch({ type: 'sendNotif', notif: newNotif })
        })
        const prevTxt = this.taskCopy.txt
        this.taskCopy.txt = ev.target.innerText
        const txt = `Task '${prevTxt}' was changed to '${ev.target.innerText}'`
        let newActivity = boardService.getEmptyActivity(txt, this.user)
        newActivity.taskId = this.taskCopy.id
        this.activity = newActivity

        this.$notify({
          message: 'Task txt updated',
          position: 'bottom-left',
          duration: 2000
        })
        this.updateTask()
      }
    },
    updateTask() {
      this.$emit('updateTask', this.taskCopy, this.activity)
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
      this.taskCopy.members.forEach(member => {
        let newNotif = userService.getEmptyNotif()
        newNotif.txt = `Upadte task priority to "${opt.txt}"`
        newNotif.type = 'all'
        newNotif.byUser = {
          mail: this.user.email,
          imgUrl: this.user.imgUrl
        }
        newNotif.toUserId = member._id
        this.$store.dispatch({ type: 'sendNotif', notif: newNotif })
      })
      const txt = `Task priority was updated to ${opt.txt}`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      newActivity.taskId = this.taskCopy.id
      this.activity = newActivity
      this.taskCopy.priority.txt = opt.txt
      this.taskCopy.priority.color = opt.color
      this.$notify({
        message: 'Task priority updated',
        position: 'bottom-left',
        duration: 2000
      })
      this.updateTask()
      this.isPriorsShowen = false
    },
    updateTaskStatus(opt) {
      this.taskCopy.members.forEach(member => {
        let newNotif = userService.getEmptyNotif()
        newNotif.txt = `Upadte task status to "${opt.txt}"`
        newNotif.type = 'all'
        newNotif.byUser = {
          mail: this.user.email,
          imgUrl: this.user.imgUrl
        }
        newNotif.toUserId = member._id
        this.$store.dispatch({ type: 'sendNotif', notif: newNotif })
      })
      const txt = `Task status was updated to ${opt.txt}`
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      newActivity.taskId = this.taskCopy.id
      this.activity = newActivity

      this.taskCopy.status.txt = opt.txt
      this.taskCopy.status.color = opt.color
      this.$notify({
        message: 'Task status updated',
        position: 'bottom-left',
        duration: 2000
      })
      this.updateTask()
      this.isPriorsShowen = false
    },
    closePopups() {
      this.isStatusesShowen = false
      this.isPriorsShowen = false
    }
  },
  created() {
    eventBus.$on('updateTaskPreview', this.updateComponentTask)
    eventBus.$on('updateTaskPreviewDestory', task => {
      this.taskCopy = task
      this.activity = null
      this.updateTask()
    })
    this.taskCopy = this.task
  }
}
</script>
