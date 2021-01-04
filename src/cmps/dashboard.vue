<template>
  <section v-if="board" class="dashboard">
    <i @click="closeDashboard" class="fas fa-times"></i>
    <h2 class="title-static">{{board.name}} Statics</h2>
    <section class="box-items-container flex wrap align-center justify-center">
      <box-item
        title="Activities"
        classIcon="fa-history"
        :value="activitesLength"
      />
      <box-item
        title="Members"
        classIcon="fa-users"
        :value="boardMembersLength"
      />
      <box-item
        title="Groups"
        classIcon="fa-layer-group"
        :value="sumTasksGroups.groups"
      />
      <box-item
        title="Tasks"
        classIcon="fa-tasks"
        :value="sumTasksGroups.tasks"
      />
    </section>
    <div style="width: 100%" class="charts flex align-center space-between">
      <chart :dataChart="taskByStatus" title="Status Popluer in task"></chart>
      <chart :dataChart="memberForTasks" title="Member tasks count"></chart>
    </div>
  </section>
</template>

<script>
import chart from './chart'
import boxItem from './box-item'
// import _ from 'lodash'
export default {
  name: 'dashboard-board',
  components: { boxItem, chart },
  computed: {
    board() {
      return this.$store.getters.board
    },
    activitesLength() {
      return this.$store.getters.boardActivities.length
    },
    boardMembersLength() {
      return this.$store.getters.board.members.length
    },
    taskByStatus() {
      const tasksStatuses = [...this.$store.getters.tasksByStatues].map(
        status => {
          const newStatus = {
            label: status.txt || 'need to review',
            value: status.tasks.length
          }
          return newStatus
        }
      )

      return tasksStatuses
    },
    memberForTasks() {
      const tasksMapStatus = [...this.$store.getters.tasksByStatues]
      const membersTask = []
      tasksMapStatus.forEach(status => {
        status.tasks.forEach(task => {
          task.members.forEach(member => {
            membersTask.push(member.fullName)
          })
        })
      })
      const membersCount = membersTask.reduce((acc, member) => {
        if (!acc[member]) acc[member] = { value: 0, label: member }
        acc[member].value++
        return acc
      }, {})

      return Object.values(membersCount)
    },
    sumTasksGroups() {
      const board = JSON.parse(JSON.stringify(this.$store.getters.board))
      let numberTasks = []
      board.groups.forEach(group => {
        const numbersTaskInGroup = group.tasks.length
        numberTasks.push(numbersTaskInGroup)
      })
      const res = numberTasks.reduce((acc, number) => {
        acc += number
        return acc
      }, 0)
      const numbersGroup = board.groups.length
      const resGroupTasksLength = {
        tasks: res,
        groups: numbersGroup
      }
      return resGroupTasksLength
    }
  },
  methods: {
    closeDashboard() {
      console.log('close dashboard...')
      this.$emit('closeDashboard')
    }
  }
}
</script>
