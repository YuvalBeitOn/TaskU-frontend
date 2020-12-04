<template>
  <section class="trilo flex wrap align-center">
      <status-list :statuses="tasksByStatues" />
     
  </section>
</template>

<script>
import statusList from './status-list'
export default {
    name:'Trello-mode',
computed:{
    tasksByStatues(){
        return this.$store.getters.tasksByStatues
    }
},
components:{
    statusList
}
}
</script>
<style lang="scss">
.trilo{
    .box{
        height: 400px ;
        width: 350px;
    }

}
</style>
<style>

</style>