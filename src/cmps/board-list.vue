<template>
  <section class="board-list">
    <h1>Boards: <span><button @click="addBoard">+</button></span></h1>
    <form @submit.prevent="emitSearch">
      <input type="text" @input="emitSearch" v-model="searchBoard" placeholder="Search" />
      <button>Search</button>
    </form>
    <ul v-if="boards" class="boards-list">
      <li v-for="board in boards" :key="board._id">
        <button @click="removeCurrBoard(board._id)">X</button>
        <router-link :to="'/board/' + board._id">{{ board.name }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import lodash from 'lodash'

export default {
  name: 'board-list',
  props:{
    boards:[Array,Object],
  },
  data(){
      return{
          searchBoard:''
      }
  },
  computed: {

  },
  methods: {
      emitSearch(){
        const searchBoard = JSON.parse(JSON.stringify(this.searchBoard))
        this.$emit('searchBoard',searchBoard)
         
      },
    removeCurrBoard(boardId) {
      this.$emit('removeBoard',boardId)
    },
    addBoard(){
      this.$emit('addNewBoard')
    },
  },
  created(){
   this.emitSearch = lodash.debounce(this.emitSearch, 500)

  }

}
</script>
