<template>
  <section class="trilo flex wrap align-center">
      <status-list :statues="tasksByStatues" />
     
  </section>
</template>

<script>
import statusList from '@/cmps/trilo/statuses-list'
export default {
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