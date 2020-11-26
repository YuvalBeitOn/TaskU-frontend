<template>
  <li
    :class="{
      'group-preview width100 flex space-between align-center': true,
      expanded: expanded
    }"
    @click="expandGroup"
  >
    <!-- <button @click.stop="deleteGroup(group.id)">
      <i class="fas fa-trash-alt fa-icon"></i>
    </button> -->
    <div class="flex align-center">
      <button class="expand-btn" @click.stop="toggleGroup">
        <i @click.stop="toggleGroup" class="fas fa-chevron-down fa-icon"></i>
      </button>
      <h4 class="group-headers group-name">{{ group.name }}</h4>
    </div>
    <span v-if="!isExpanded">{{ tasksCount }}</span>
    <div v-if="isExpanded" class="flex space-between align-center">
      <div class="group-headers headers  flex">
        <h4>Members</h4>
        <h4>Status</h4>
        <h4>Priority</h4>
        <h4>Due Date</h4>
      </div>
    </div>
    <task-list v-if="isExpanded" :tasks="group.tasks" :groupId="group.id" />
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
  data() {
    return {
      isExpanded: true
    }
  },
  methods: {
    emitDelete(groupId) {
      this.$emit('deleteGroup', groupId)
    },
    toggleGroup() {
      this.isExpanded = !this.isExpanded
    },
    expandGroup() {
      this.isExpanded = true;
    }
  },
  computed: {
    tasksCount() {
      return `${this.group.tasks.length} items`
    },
    expanded() {
      return this.isExpanded ? true : false
    }
  },
  components: {
    taskList
  }
}
</script>
