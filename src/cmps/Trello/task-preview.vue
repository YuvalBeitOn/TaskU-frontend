<template>
  <section class="task-preview-card flex column align-center">
    <div class="task-preivew-header flex space-between">

      {{task.txt}}
    </div>
  </section>
</template>

<script>

export default {
  name:'task-preview',
props:{
   task:Object 
}
}
</script>

<style lang="scss">
.task-preview-card{
      height: 100%;
    border-radius: 4px;
    background: #ffffff;
    position: relative;
    padding: 8px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.29);
    font-size: 13px;
    font-weight: 400;
    color: #333333;
    cursor: pointer;
}
</style>