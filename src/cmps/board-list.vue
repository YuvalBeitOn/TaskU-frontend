<template>
  <section class="board-list flex column">
    <div class="top-bar flex space-around align-center">
      <h1 class="title-board-list">Boards</h1>
        <i @click="addBoard" class="btn-add fas fa-plus-circle"></i>
    </div>
    <input
      class="board-list-search"
      type="text"
      @input="emitSearch"
      v-model="searchBoard"
      placeholder="Search"
    />

    <ul v-if="boards" class="boards-list clean-list">
      <li class="board-item" v-for="board in boards" :key="board._id">
          
          <i @click="removeCurrBoard(board._id)" class="trash-icon fas fa-trash"></i>
        <router-link :to="'/board/' + board._id">{{ board.name }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import lodash from 'lodash'

export default {
  name: 'board-list',
  props: {
    boards: [Array, Object],
  },
  data() {
    return {
      searchBoard: '',
    }
  },
  computed: {},
  methods: {
    emitSearch() {
      const searchBoard = JSON.parse(JSON.stringify(this.searchBoard))
      this.$emit('searchBoard', searchBoard)
    },
    removeCurrBoard(boardId) {
      console.log('boardId:', boardId)
      this.$emit('removeBoard', boardId)
    },
    addBoard() {
      this.$emit('addNewBoard')
    },
  },
  created() {
    this.emitSearch = lodash.debounce(this.emitSearch, 500)
  },
}
</script>
