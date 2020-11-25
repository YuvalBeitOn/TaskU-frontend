<template>
  <section class="board-app">
    <board-list
      @searchBoard="setSearch"
      @removeBoard="removeCurrBoard"
      @addBoard="addNewBoard"
      :boards="boards"
    />
    <group-list v-if="board" :groups="board.groups" :boardName="board.name" />
  </section>
</template>

<script>
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import {boardService} from '@/services/board.service';
export default {
  name: 'board-app',
  computed: {
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    },
  },
  methods: {
    setSearch(searchBoard) {
      this.$store.commit({ type: 'setSearch', searchBoard })
      this.$store.dispatch({ type: 'loadBoards' })
    },
    removeCurrBoard(boardId) {
      this.$store.dispatch({ type: 'removeBoard', boardId })
    },
    addNewBoard() {
      const board = boardService.getEmptyBoard();
      console.log('board:', board)
     this.$store.dispatch({ type: 'saveBoard', board })
    },

    loadBoard() {
      this.$store.dispatch({
        type: 'loadBoard',
        boardId: this.$route.params.boardId,
      })
    },
  },
  watch: {
    '$route.params.boardId'() {
      this.loadBoard()
    },
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    this.loadBoard()
  },
  components: {
    groupList,
    boardList,
  }
}
</script>
