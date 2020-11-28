<template>
  <ul class="task-activities">
    <li class="activity" v-for="activity in activities" :key="activity.id">
      <div>{{ activity.txt }}</div>
      <div>By: {{ activity.byUser.fullName }}</div>
      <div>At: {{ activity.createdAt | moment('calendar', 'July 10 2011') }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'task-activities',
  props: {
    activities: {
      type: Array
    }
  }
}
</script>

<style></style>
