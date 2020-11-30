<template>
  <section>
    <li
      :class="{
        'group-preview width100 flex space-between align-center': true,
        expanded: expanded,
      }"
      @click="expandGroup"
    >
      <div class="group-actions-container flex relative align-center">
        <button
          :style="getStyleStr(group.color)"
          class="expand-btn"
          @click.stop="toggleGroupActions"
        >
          <i class="expand-arrow fas fa-arrow-down"></i>
        </button>
        <h4
          class="group-headers group-name editable"
          ref="groupName"
          :style="groupColor"
          @blur="updateGroupName"
          @keydown.enter="updateGroupName"
          contenteditable
        >
          {{ groupCopy.name }}
        </h4>
        <div class="flex column group-actions" v-if="isActionsShowen">
          <div class="group-action flex align-center" @click.stop="toggleGroup">
            <button  class="act-btn">
              <i class="fas fa-expand-alt fa-icon-act"></i>
            </button>
            <span class="act-txt">Expand</span>
          </div>
          <div
            class="group-action flex align-center"
            @click.stop="deleteGroup(groupCopy.id)"
          >
            <button class="act-btn">
              <i class="fas fa-trash fa-icon-act"></i>
            </button>
            <span class="act-txt">Delete</span>
          </div>
          <div
            class="group-action flex align-center"
            @click.stop="toggleColorsMenu"
          >
            <button class="act-btn">
              <i class="fas fa-paint-brush fa-icon-act"></i>
            </button>
            <span class="act-txt">Change Color</span>
          </div>
          <div
            class="group-action flex align-center"
            @click.stop="duplicateGroup"
          >
            <button class="act-btn">
              <i class="far fa-copy fa-icon-act"></i>
            </button>
            <span class="act-txt">Duplicate</span>
          </div>
          <div
            class="group-action flex align-center"
            @click.stop="focusGroupName"
          >
            <button class="act-btn">
              <i class="far fa-edit fa-icon-act"></i>
            </button>
            <span class="act-txt">Change name</span>
          </div>
          <colors-menu v-if="isColorsShowen" @setColor="setGroupColor" />
        </div>
      </div>
      <span v-if="!isExpanded">{{ tasksCount }}</span>
      <div v-if="isExpanded" class="flex space-between align-center">
        <div class="group-headers headers flex">
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
<div class="progress-bar-section flex">
   <!-- <h2> -->
<!-- {{progressBarPrio}} -->

  <!-- </h2>  -->
<progress-bar :progressBarData="progressBarData" />

<progress-bar :progressBarData="progressBarPrio" />
</div>
    </li>
    <div
      class="back-drop-layer"
      v-if="isActionsShowen"
      @click="toggleGroupActions"
    ></div>
  </section>
</template>

<script>
import progressBar from '@/cmps/progress-bar'
import taskList from './task-list.vue'
import colorsMenu from './colors-menu'
export default {
  name: 'group-preview',
  props: {
    group: Object,
    deleteGroup: Function,
  },
  data() {
    return {
      isExpanded: true,
      groupCopy: null,
      isActionsShowen: false,
      isColorsShowen: false,
    }
  },
  methods: {
    focusGroupName() {
      this.$refs.groupName.focus()
      this.isActionsShowen = false
    },
    getStyleStr(colorStr) {
      return `backgroundColor:${colorStr}`
    },
    duplicateGroup() {
      this.$emit('duplicateGroup', this.groupCopy)
    },
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
      this.isExpanded = false
    },
    toggleGroup() {
      this.isExpanded = !this.isExpanded
      this.isActionsShowen = false
    },
    expandGroup() {
      this.isExpanded = true
      this.isActionsShowen = false
    },
    setGroupColor(color) {
      this.isActionsShowen = false
      this.groupCopy.color = color
      this.isColorsShowen = false
      this.$emit('updateGroup', this.groupCopy)
    },
    updateGroupName(ev) {
      this.groupCopy.name = ev.target.innerText
      this.$emit('updateGroup', this.groupCopy)
    },

  },
  computed: {
    progressBarData() {
      let statusPercentageMap = this.group.tasks.reduce((acc, task) => {      
        if (!acc[task.status.txt]) acc[task.status.txt] = {count:0,statusColor:task.status.color};
        acc[task.status.txt].count++
        return acc
      }, {})
      const totalSum = this.group.tasks.length
      for (let key in statusPercentageMap) {
        statusPercentageMap[key].fraction = (`${statusPercentageMap[key].count} / ${totalSum}`)
        statusPercentageMap[key].percentage = (statusPercentageMap[key].count / totalSum) * 100
        statusPercentageMap[key].name = key;
      }
      return statusPercentageMap
     
    },
        progressBarPrio() {
      let priorityPercentageMap = this.group.tasks.reduce((acc, task) => {      
        if (!acc[task.priority.txt]) acc[task.priority.txt] = {count:0,statusColor:task.priority.color};
        acc[task.priority.txt].count++
        return acc
      }, {})
      const totalSum = this.group.tasks.length
      for (let key in priorityPercentageMap) {
        priorityPercentageMap[key].fraction = (`${priorityPercentageMap[key].count} / ${totalSum}`)
        priorityPercentageMap[key].percentage = (priorityPercentageMap[key].count / totalSum) * 100
        priorityPercentageMap[key].name = key;
      }
      return priorityPercentageMap
     
    },
    tasksCount() {
      return `${this.groupCopy.tasks.length} items`
    },
    expanded() {
      return this.isExpanded ? true : false
    },
    groupColor() {
      return { color: this.groupCopy.color }
    },
  },
  created() {
    this.groupCopy = this.group
  },
  components: {
    taskList,
    colorsMenu,
    progressBar
  },
}
</script>
,
