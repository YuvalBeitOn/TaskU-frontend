<template>
  <ul v-if="activities.length" class="task-activities">
    <li
      class="activity flex space-between align-center"
      v-for="activity in activities"
      :key="activity.id"
    >
      <div
        v-if="activity.byUser"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <avatar
          class="profile-img"
          v-if="activity.byUser"
          :username="activity.byUser.fullName"
        ></avatar>
        <transition name="fade">
          <span class="username" v-show="isHovering">{{
            activity.byUser.fullName
          }}</span>
        </transition>
      </div>

      <div>{{ activity.txt }}</div>
      <div class="activity-date">
        > {{ activity.createdAt | moment('calendar', 'July 10 2011') }}
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'task-activities',
  props: {
    activities: {
      type: Array
    }
  },
  data() {
    return {
      isHovering: false
    }
  },
  components: {
    Avatar
  }
}
</script>

<style></style>
