<template>
  <li class="group-preview width100">
    <div class="flex space-between align-center">
      <div class="group-header align-center flex relative">
        <h2>{{ group.name }}</h2>
      </div>
      <div class="headers flex">
        <h3>Members</h3>
        <h3>Status</h3>
        <h3>Priority</h3>
        <h3>Due Date</h3>
      </div>
    </div>
    <task-list :tasks="group.tasks" />
  </li>
</template>

<script>
import taskList from './task-list.vue'
export default {
  name: 'group-preview',
  props: {
    group: Object
  },
  components: { taskList }
}
</script>
