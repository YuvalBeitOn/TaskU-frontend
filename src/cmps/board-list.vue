<template>
  <section class="board-list">
    <h1>This is board-list component</h1>
    <form>
      <input type="text" placeholder="search" />
      <button>Search</button>
    </form>
    <ul v-if="boards" class="boards-list">
      <li v-for="board in boards" :key="board._id">
        <button @click="removeBoard(board._id)">X</button>
        <router-link :to="'/board/' + board._id">{{ board.name }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'board-list',
  computed: {
    boards() {
      return this.$store.getters.boards
    }
  },
  methods: {
    removeBoard(boardId) {
      console.log('boardId:', boardId)
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  }
}
</script>
