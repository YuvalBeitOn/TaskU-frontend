<template>
  <section class="board-activiites">
    <side-bar @closeBtn="closeBtn">
      <main class="flex column wrap ">
      <h2 class="title">Board activiites</h2>
      <h3>{{boardActiviitesTitle}}</h3>
      <div class="activity-contianer">
<activites-board v-if="boardActiviites.length" :activities="boardActiviites" />
</div>
</main>
    </side-bar>
  </section>
</template>

<script>
import sideBar from '@/cmps/sidebar.vue'
import activitesBoard from '@/cmps/task-activities'
export default {
components:{sideBar,activitesBoard},
computed:{
boardActiviites(){
return this.$store.getters.boardActivities
},
boardActiviitesTitle(){
 return (this.boardActiviites.length) ? this.boardActiviites.length + ' Activiites on the Board' : 'Not have yet activiites' 

}
},
methods:{
  closeBtn(){
      this.$router.push(`/board/${this.$route.params.boardId}`)

  }
}
}

</script>

<style>

</style>