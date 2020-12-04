<template>
  <section  class="status-preview">
    <div :style="`background-color:${status.color}`" class="status-preview-list">

      <h2>{{status.txt || 'no label'}}</h2>
      <div class="cards-container">

    <task-preview v-for="task in status.tasks" :key="task.id" :task="task" /> 
      </div>
    </div>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  name:'statues-preview',
props:{
status:Object
},
components:{
    taskPreview
}
}
</script>
<style lang="scss">
.status-preview-list{
  border-radius: 5px;
    vertical-align: top;
    /* max-height: 100%; */
  margin:10px 20px;
  .cards-container{
        min-height: 110px;
    max-height: 100%;
    overflow-y: auto;
    margin: 8px 8px 0 8px;
  }
  
}
</style>
