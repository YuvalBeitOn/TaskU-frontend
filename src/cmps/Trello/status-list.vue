<template>
  <div class="status-list- flex ">
   <draggable class="flex" :list="clonedStatuses" group="list">

    <status-preview
      v-for="status in clonedStatuses"
      :key="status.id"
      :status="status"
      :group="group"
    />
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

import statusPreview from './status-preview.vue'
export default {
  props: {
    statuses: Array,
    group: Object
  },
  data(){
    return {
      clonedStatuses:null
    }
  },
  created(){
    this.clonedStatuses = this.statuses
  },
  components: {
    statusPreview,
    draggable

  }
}
</script>
