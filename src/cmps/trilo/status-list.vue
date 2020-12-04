<template>
  <section class="status-list">
    
      <status-preview v-for="status in statuses" :key="status.id" :status="status" />

  </section>
</template>

<script>
import statusPreview from '@/cmps/trilo/status-preview'
export default {
props:{
    statuses:Array
}
}
</script>

<style>

</style>