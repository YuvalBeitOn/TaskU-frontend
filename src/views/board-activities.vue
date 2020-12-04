<template>
  <section v-if="boardActiviitesToShow" class="board-activiites">
    <side-bar @closeBtn="closeBtn">
      <main class="flex column wrap ">
      <h2 class="title">Board activiites</h2>
      <h3>{{boardActiviitesTitle}}</h3>
      <div class="activity-contianer">
        <div class="filter flex space-between">
        <search-activity @searchBoard="setSearch" />
           <el-checkbox  label="Tasks"></el-checkbox>
           <el-checkbox label="Groups"></el-checkbox>
        </div>
<activites-board  :activities="boardActiviitesToShow" />
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
boardActiviitesToShow(){
  const activities=this.$store.getters.boardActivities
  if(!this.filterBy) return activities
 return activities.filter(actvt => actvt.txt.toLowerCase().includes(this.filterBy.toLowerCase()))
},
boardActiviitesTitle(){
 return (this.boardActiviitesToShow.length) ? this.boardActiviitesToShow.length + ' Activiites on the Board' : 'Not have yet activiites' 

}
},
methods:{
  closeBtn(){
      this.$router.push(`/board/${this.$route.params.boardId}`)
  },
  setSearch(searchKeys){
    console.log('searchKeys:', searchKeys)
    this.filterBy = searchKeys
  }
},

}

</script>

<style>

</style>