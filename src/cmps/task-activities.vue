<template>
  <ul v-if="activities && activities.length" class="task-activities">
    <li
      class="activity flex space-between align-center relative"
      @mouseover="setHoveredActivity(activity.id)"
      @mouseleave="isActHovering = false"
      v-for="activity in activities"
      :key="activity.id"
    >
      <button
        class="delete-activity-btn"
        @click="deleteActivity(activity.id)"
        v-if="isActHovering && hoveredActId === activity.id"
      >
        X
      </button>
      <section class="activity-details flex align-center">
        <div
          class="user-avatar"
          v-if="activity.byUser"
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
        >
          <avatar :user="activity.byUser" />

          <!-- <transition name="fade">
            <span class="username" v-show="isHovering">{{
              activity.byUser.fullName
            }}</span>
          </transition> -->
        </div>
        <span class="activity-txt"> {{ activity.txt }}</span>
      </section>
      <div class="activity-date flex end">
        <h6><i class="far fa-clock"></i> {{ getTime(activity.createdAt) }}</h6>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from '@/cmps/user-avatar.vue'

import moment from 'moment'
export default {
  name: 'task-activities',
  props: {
    activities: {
      type: Array
    }
  },
  data() {
    return {
      isHovering: false,
      isActHovering: false,
      hoveredActId: null
    }
  },
  methods: {
    getTime(time) {
      return moment(time).fromNow()
    },
    deleteActivity(activityId) {
      this.$emit('deleteActivity', activityId)
    },
    setHoveredActivity(actId) {
      this.isActHovering = true
      this.hoveredActId = actId
    }
  },
  components: {
    Avatar
  },
  created() {}
}
</script>

<style></style>
