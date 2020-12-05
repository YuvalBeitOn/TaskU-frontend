<template>
  <section class="task-preview-card flex column">
    <div
      class="task-preivew-header flex space-between relative"
    >
      <span>{{ task.txt }}</span>
      <avatar :user="user" :size="20" />
    </div>
    <button class="details-btn" @click.stop="openTaskDetails"><i class="fas fa-file-alt details-icon"></i></button>
    <task-details :task="task" :group="group" v-if="isTaskDetailsShown" :isTaskDetailsShown="isTaskDetailsShown" />
  </section>
</template>

<script>
import Avatar from '@/cmps/user-avatar.vue'
import taskDetails from './task-details'

export default {
  name: 'task-preview',
  components: {
    Avatar,
    taskDetails
  },
  props: {
    task: Object,
    group: Object
  },
  data() {
    return {
      isTaskDetailsShown: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    openTaskDetails() {
      console.log('here');
      this.isTaskDetailsShown = true
    }
  }
}
</script>
