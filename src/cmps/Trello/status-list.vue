<template>
  <ul class="status-list clean-list flex">
    <status-preview
      v-for="status in statuses"
      :key="status.id"
      :status="status"
      :group="group"
    />
  </ul>
</template>

<script>
import statusPreview from './status-preview.vue'
export default {
  props: {
    statuses: Object,
    group: Object
  },
  components: {
    statusPreview
  }
}
</script>
