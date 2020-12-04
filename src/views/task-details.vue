<template>
  <side-bar @closeBtn="closeBtn">
    <section v-if="task" class="task-details-section">
      <div class="task-title-container">
        <h2
          class="task-title editable"
          spellcheck="false"
          @blur.stop="updateTaskTxt"
          @keyup.enter="updateTaskTxt"
          contenteditable
        >
          {{ task.txt }}
        </h2>
      </div>
      <el-tabs>
        <el-tab-pane label="Task Posts">
          <task-posts
            v-if="posts"
           
            @updatePosts="updatePosts"
            :task="task"
            :posts="posts"
          />
        </el-tab-pane>
        <el-tab-pane label="Task Activities">
          <task-activities
            v-if="taskActivities && taskActivities.length"
            :activities="taskActivities"
          />
        </el-tab-pane>
      </el-tabs>
    </section>
  </side-bar>
</template>
<script>
import sideBar from '@/cmps/sidebar.vue'
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
      newPost: null,
    }
  },
  created() {
    const taskInfo = this.getTaskInfoById()
    console.log('taskInfo.task:', taskInfo.task)
    this.task = taskInfo.task
    console.log(' this.task:', this.task)
    this.groupId = taskInfo.groupId
  },
  methods: {
    closeBtn() {
      this.$router.push(`/board/${this.$route.params.boardId}`)
    },
    getTasksPath() {
      const groupIdx = this.board.groups.findIndex(
        (group) => group.id === this.groupId
      )
      const tasks = this.board.groups[groupIdx].tasks
      return tasks
    },
    updateTaskTxt(ev) {
      ev.target.blur()
      if (ev.target.innerText === this.task.txt) return
      else {
        this.task.txt = ev.target.innerText
        const tasks = this.getTasksPath()
        const taskIdx = tasks.findIndex((task) => task.id === this.task.id)
        tasks.splice(taskIdx, 1, this.task)
        this.$store.dispatch({
          type: 'saveBoard',
          board: this.board,
        })
        this.$store.dispatch({ type: 'updateBoard', board: this.board })
        eventBus.$emit('updateTaskPreview', this.task)
      }
    },
    updatePosts(posts, activity) {
      const tasks = this.getTasksPath()
      const taskIdx = tasks.findIndex((task) => task.id === this.task.id)
      tasks[taskIdx].posts = posts
      this.board.activities.unshift(activity)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board,
      })
      this.$store.dispatch({ type: 'updateBoard', board: this.board })

      eventBus.$emit('updateTaskPreview', this.task)
    },
    getTaskInfoById() {
      let taskInfo = {}
      const taskId = this.$route.params.taskId
      const group = this.board.groups.find((group) =>
        group.tasks.find((task) => task.id === taskId)
      )
      taskInfo.task = group.tasks.find((task) => task.id === taskId)
      taskInfo.groupId = group.id
      return taskInfo
    },
    forceRerender() {
      this.componentKey += 1
    },

  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    user() {
      return this.$store.getters.user
    },
    posts() {
      console.log('postlist////', this.task.posts)
      console.log('//// orelll posts: type of', typeof this.task.posts)
      return this.task.posts
      // return false
    },
    taskActivities() {
      let taskActivities = []
      const boardActivities = JSON.parse(
        JSON.stringify(this.$store.getters.boardActivities)
      )
      const taskId = this.$route.params.taskId
      boardActivities.forEach((activity) => {
        if (activity.taskId === taskId) taskActivities.push(activity)
      })
      return taskActivities
    },
  },
  watch: {
    '$route.params.taskId'() {
      const taskInfo = this.getTaskInfoById()
      this.groupId = taskInfo.groupId
      this.task = JSON.parse(JSON.stringify(taskInfo.task))
      console.log(this.task, 'my task - task details')
    },
  },
  destroyed() {
    console.log('im destroy//////////')
    // this.task
    console.log('this.task destory:', this.task)
    // eventBus.$emit('updateTaskPreview', this.task)

    eventBus.$emit('updateTaskPreviewDestory', this.task)
  },
  components: {
    taskPosts,
    taskActivities,
    sideBar,
  },
}
</script>
