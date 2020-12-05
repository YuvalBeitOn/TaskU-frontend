<template>
  <section class="trello flex wrap align-center justify-center">
    <div class="status-container">
      <status-list :statuses="tasksByStatues"/>
    </div>
  </section>
</template>

<script>
import statusList from './status-list'
export default {
  name: 'Trello-mode',
  computed: {
    tasksByStatues() {
      return this.$store.getters.tasksByStatues
    }
  },
  components: {
    statusList
  }
}
</script>
