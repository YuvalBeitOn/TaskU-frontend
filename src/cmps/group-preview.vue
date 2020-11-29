<template>
    <li
      :class="{
        'group-preview width100 flex space-between align-center': true,
        expanded: expanded
      }"
      @click="expandGroup"
    >
      <div class="flex">
        <div>
          <button @click="toggleGroupActions">
            <i class="fas fa-arrow-down fa-icon"></i>
          </button>
          <button class="expand-btn" @click.stop="toggleGroup">
            <i
              @click.stop="toggleGroup"
              class="fas fa-expand-arrows-alt fa-icon"
            ></i>
          </button>
          <div class="flex column group-actions" v-if="isActionsShowen">
            <button @click.stop="deleteGroup(groupCopy.id)">
              <i class="fas fa-trash"></i> Delete
            </button>
            <button @click="toggleColorsMenu">
              <i class="fas fa-paint-brush"></i> Change color
            </button>
          </div>
          <colors-menu v-if="isColorsShowen" @setColor="setGroupColor" />
        </div>
        <h4
          class="group-headers group-name"
          :style="groupColor"
          @blur="updateGroupName"
          @keyup.enter="updateGroupName"
          contenteditable
        >
          {{ groupCopy.name }}
        </h4>
      </div>
      <span v-if="!isExpanded">{{ tasksCount }}</span>
      <div v-if="isExpanded" class="flex space-between align-center">
        <div class="group-headers headers flex" :style="groupColor">
          <h4 class="list-title">Members</h4>
          <h4 class="list-title">Status</h4>
          <h4 class="list-title">Priority</h4>
          <h4 class="list-title date">Due Date</h4>
        </div>
      </div>
      <task-list
        :taskColor="group.color"
        v-if="isExpanded"
        :tasks="groupCopy.tasks"
        :groupId="groupCopy.id"
        @forceRender="emitForceRender"
      />
    </li>
</template>

<script>
import taskList from './task-list.vue'
import colorsMenu from './colors-menu'
export default {
  name: 'group-preview',
  props: {
    group: Object,
    deleteGroup: Function
  },
  data() {
    return {
      isExpanded: true,
      groupCopy: null,
      isActionsShowen: false,
      isColorsShowen: false
    }
  },
  methods: {
    emitForceRender() {
      this.$emit('emitForceRender')
    },
    toggleColorsMenu() {
      this.isColorsShowen = !this.isColorsShowen
    },
    toggleGroupActions() {
      this.isActionsShowen = !this.isActionsShowen
    },
    emitDelete(groupId) {
      this.$emit('deleteGroup', groupId)
    },
    toggleGroup() {
      this.isExpanded = !this.isExpanded
    },
    expandGroup() {
      this.isExpanded = true
    },
    setGroupColor(color) {
      this.groupCopy.color = color
      this.toggleGroupActions()
      this.toggleColorsMenu()
      this.$emit('updateGroup', this.groupCopy)
    },
    updateGroupName(ev) {
      console.log(ev.target.innerText)
      this.groupCopy.name = ev.target.innerText
      this.$emit('updateGroup', this.groupCopy)
    }
  },
  computed: {
    tasksCount() {
      return `${this.groupCopy.tasks.length} items`
    },
    expanded() {
      return this.isExpanded ? true : false
    },
    groupColor() {
      return { color: this.groupCopy.color }
    }
  },
  created() {
    this.groupCopy = this.group
  },
  components: {
    taskList,
    colorsMenu,
  }
}
</script>
,
