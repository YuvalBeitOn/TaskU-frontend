<template>
  <ul v-if="activities.length" class="task-activities">
    <li
      class="activity flex space-between align-center"
      v-for="activity in activities"
      :key="activity.id"
    >
      <section class="activity-details flex align-center">
        <div
          class="user-avatar"
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
        <div class="activity-txt">{{ activity.txt }}</div>
      </section>
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
