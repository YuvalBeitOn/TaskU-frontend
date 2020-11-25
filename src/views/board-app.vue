<template>
  <section class="board-app">
    <board-list />
    <group-list v-if="board" :groups="board.groups" :boardName="board.name" />
  </section>
</template>

<script>
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'

export default {
  name: "board-app",
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  methods: {
    loadBoard() {
      this.$store.dispatch({
        type: 'loadBoard',
        boardId: this.$route.params.boardId
      })
    }
  },
  watch: {
    '$route.params.boardId'() {
      this.loadBoard()
    }
  },
  created() {
    this.loadBoard()
  },
  components: {
    groupList,
    boardList
  }
}
</script>
