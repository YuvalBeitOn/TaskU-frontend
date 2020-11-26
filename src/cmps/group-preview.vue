<template>
  <li class="group-preview width100">
    <div class="flex space-between align-center">
      <div class="group-header align-center flex relative">
        <button @click.stop="deleteGroup(group.id)">
          <i class="fas fa-trash-alt fa-icon"></i>
        </button>
        <h2>{{ group.name }}</h2>
      </div>
      <div class="headers flex">
        <h3>Members</h3>
        <h3>Status</h3>
        <h3>Priority</h3>
        <h3>Due Date</h3>
      </div>
    </div>
    <task-list :tasks="group.tasks" :groupId="group.id" />
  </li>
</template>

<script>
import taskList from './task-list.vue'
export default {
  name: 'group-preview',
  props: {
    group: Object,
    deleteGroup: Function
  },
  methods: {
    emitDelete(groupId) {
      this.$emit('deleteGroup', groupId)
    }
  },
  components: { taskList }
}
</script>
