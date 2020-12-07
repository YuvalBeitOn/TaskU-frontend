<template>
  <section class="dashboard-vue">
    <div class="btn-contorllers">
      <button @click="setBoard(board)" v-for="board in boards" :key="board._id">{{board.name}}</button>
    </div>
    <div class="small">

      <line-chart v-if="datacollection"  :chart-data="datacollection" />
      <button @click="fillData()">Randomize</button>
    </div>
  </section>
</template>

<script>
import LineChart from '@/cmps/chart'

export default {
components:{LineChart,},
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {

    },
    created(){
      this.$store.dispatch({ type: 'loadBoards' })

    },
    computed:{
      boards(){
        return this.$store.getters.boards
      },
      labels(){
        const statuses =  this.$store.getters.tasksByStatues
        const labels  =   Object.keys(statuses)
        return labels
      }      
    },
    methods: {
      setBoard(board){
        this.$store.commit({type:'setBoard',board})
        this.fillData()
      },
      fillData () {
        this.datacollection = {
          labels: ['baba','das','dasd'],
          datasets: [
            {
              label: '',
              backgroundColor: 'black',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'workingOnIt',
              backgroundColor: 'green',
              data: [this.getRandomInt(), this.getRandomInt()]
            },
            {
              label: '',
              backgroundColor: 'pink',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'done',
              backgroundColor: '#f87979',
              data: [20, this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>


<style>
.small{
   max-width: 500px;
   height: 500px;
    margin:  150px auto;}
</style>