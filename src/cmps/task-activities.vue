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
            :size=20
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
      <div class="activity-date flex end">
        <h6><i class="far fa-clock"></i> {{getTime(activity.createdAt)}}</h6>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from 'vue-avatar'
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
      isHovering: false
    }
  },
  methods:{
    getTime(time){
      return moment(time).calendar()
    }
  },
  components: {
    Avatar
  },
  created() {
    console.log('activities:', this.activities);
  }
}
</script>

<style></style>
