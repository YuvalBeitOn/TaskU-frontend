<template>
    <section v-if="task" class="task-details-section">
        <div class="top-bar">
            <button class="cls-btn"><i @click.stop="closeBtn" class="fas fa-times"></i></button>
            <h1 class="task-title editable"
                @blur.stop="updateTaskTxt"
                @keyup.enter="updateTaskTxt"
                contenteditable
            >
                {{ task.txt }}
            </h1>
        </div>
        <el-tabs>
            <el-tab-pane label="Task Posts">
                <task-posts @updatePosts="updatePosts" :posts="posts" />
            </el-tab-pane>
            <el-tab-pane label="Task Activities">
                <task-activities :activities="task.activities" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import taskPosts from '@/cmps/task-posts'
import taskActivities from '@/cmps/task-activities'
import { eventBus } from '@/services/event-bus.service'
export default {
  name: 'task-details',
  data() {
    return {
      task: null,
      groupId: null,
      componentKey: 0,
      newPost: null
    }
  },
  created() {
    const taskInfo = this.getTaskInfoById()
    this.task = taskInfo.task
    this.groupId = taskInfo.groupId
  },
  methods: {
    closeBtn() {
      this.$emit('close')
      this.$router.push(`/board/${this.$route.params.boardId}`)
    },
    getTasksPath() {
      console.log('groupId', this.groupId)
      const groupIdx = this.board.groups.findIndex(
        group => group.id === this.groupId
      )
      const tasks = this.board.groups[groupIdx].tasks
      return tasks
    },
    updateTaskTxt(ev) {
      this.task.txt = ev.target.innerText
      const tasks = this.getTasksPath()
      const taskIdx = tasks.findIndex(task => task.id === this.task.id)
      tasks.splice(taskIdx, 1, this.task)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      eventBus.$emit('updateTaskPreview', this.task)
    },
    updatePosts(posts) {
      const tasks = this.getTasksPath()
      const taskIdx = tasks.findIndex(task => task.id === this.task.id)
      tasks[taskIdx].posts = posts
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      eventBus.$emit('updateTaskPreview', this.task)
    },
    getTaskInfoById() {
      let taskInfo = {}
      const taskId = this.$route.params.taskId
      const group = this.board.groups.find(group =>
        group.tasks.find(task => task.id === taskId)
      )
      taskInfo.task = group.tasks.find(task => task.id === taskId)
      taskInfo.groupId = group.id
      return taskInfo
    },
    forceRerender() {
      this.componentKey += 1
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    posts() {
      return this.task.posts
    }
  },
  watch: {
    '$route.params.taskId'() {
      const taskInfo = this.getTaskInfoById()
      this.groupId = taskInfo.groupId
      this.task = JSON.parse(JSON.stringify(taskInfo.task))
      console.log('task', this.task)
    }
  },
  components: {
    taskPosts,
    taskActivities
  }
}
</script>
