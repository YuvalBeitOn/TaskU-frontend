<template>
  <div class="status-list- flex ">
   <!-- <draggable class="flex" :list="statuses" group="list"> -->

    <status-preview
      v-for="status in clonedStatuses"
      :key="status.id"
      :status="status"
      :group="group"
    />
    <!-- </draggable> -->

  </div>
</template>

<script>
// import draggable from 'vuedraggable'

import statusPreview from './status-preview.vue'
export default {
  props: {
    statuses: Object,
    group: Object
  },
  data(){
    return {
      cloneStatuses:null
    }
  },
  created(){
    this.clonedStatuses = this.statuses
  },
  components: {
    statusPreview,
    // draggable

  }
}
</script>
