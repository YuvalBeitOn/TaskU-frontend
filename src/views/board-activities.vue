<template>
  <section v-if="boardActiviitesToShow" class="board-activities">
    <side-bar @closeBtn="closeBtn">
      <main class="flex column wrap">
        <div class="board-activities-header">
          <h2 class="title">Board activities</h2>
          <h3 class="activities-title">{{ boardActiviitesTitle }}</h3>
        </div>
        <div class="activity-contianer">
          <div class="filter">
            <search-activity @searchBoard="setSearch" />
          </div>
          <activites-board :activities="boardActiviitesToShow" />
        </div>
      </main>
    </side-bar>
  </section>
</template>

<script>
import searchActivity from '@/cmps/board-search'
import sideBar from '@/cmps/sidebar.vue'
import activitesBoard from '@/cmps/task-activities'
export default {
  name:'board-activities',
components:{sideBar,activitesBoard,searchActivity},
data(){
  return{
    filterBy:null
  }
},
computed:{
boardActivitesToShow(){
  const activities=this.$store.getters.boardActivities
  if(!this.filterBy) return activities
 return activities.filter(actvt => actvt.txt.toLowerCase().includes(this.filterBy.toLowerCase()))
},
boardActivitesTitle(){
 return (this.boardActivitesToShow.length) ? this.boardActivitesToShow.length + ' Activities on the Board' : 'Not have  activities yet..' 

}
},
methods:{
  closeBtn(){
      this.$router.push(`/board/${this.$route.params.boardId}`)
 
  },
  setSearch(searchKeys){
    this.filterBy = searchKeys
  }
},

}

</script>

<style></style>
