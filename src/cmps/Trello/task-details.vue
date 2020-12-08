<template>
  <section class="task-details-container">
    <section class="task-details flex column" v-if="isShown">
      <div class="details-header">
        <h4>{{ task.txt }}</h4>
        <span>In <i class="fal fa-arrow-right"></i> {{ board.name }}</span>
      </div>
      <div class="detail-container">
        <span><i class="fas fa-circle point-icon detail-icon"></i>Group</span>
        <span :style="groupColor" class="content group"
          ><i
            class="fas fa-circle point-icon detail-icon"
            :style="groupColor"
          ></i
          >{{ group.name }}</span
        >
      </div>

      <div class="detail-container">
        <span><i class="far fa-user-circle  detail-icon"></i> Person</span>
        <span class="content"><i class="fal fa-users"></i></span>
      </div>

      <div class="detail-container">
        <span><i class="fas fa-stream detail-icon"></i> Status</span>
        <span class="content" :style="statusColor">{{ task.status.txt }}</span>
      </div>

      <div class="detail-container" v-if="task.dueDate">
        <span><i class="fal fa-calendar-day detail-icon"></i> Date</span>
        <span class="content">{{ getTime(task.dueDate) }}</span>
      </div>
      <button class="cls-btn" @click.stop="closeTaskDetails">X</button>
    </section>
    <div
      class="back-drop-layer-details"
      v-if="isShown"
      @click="isShown = false"
    ></div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    task: Object,
    isTaskDetailsShown: Boolean,
    group: Object
  },
  data() {
    return {
      isShown: false
    }
  },
  computed: {
    statusColor() {
      return `backgroundColor: ${this.task.status.color};`
    },
    groupColor() {
      return `color: ${this.group.color};`
    },
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
    getTime(time) {
      return moment(time).format('LL')
    },
    closeTaskDetails() {
      this.isShown = false
    }
  },
  created() {
    this.isShown = this.isTaskDetailsShown
  }
}
</script>
