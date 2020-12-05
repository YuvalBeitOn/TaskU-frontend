<template>
  <section class="status-list flex">
 
      <status-preview v-for="status in statuses" :key="status.id" :status="status" />

  </section>
</template>

<script>
import statusPreview from './status-preview.vue'
export default {

props:{
    statuses:Object
},
components:{
  statusPreview
}
}
</script>
