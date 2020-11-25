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
<<<<<<< HEAD
      return this.$store.getters.currBoard;
    }
  },
  created() {
    this.$store.dispatch({
      type: "loadBoard",
      boardId: this.$route.params.boardId
    });
  },
  components: {
    groupList
  }
};
=======
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
>>>>>>> 7b84609878a17cacd584019e8a33014af1fdc2ce
</script>
