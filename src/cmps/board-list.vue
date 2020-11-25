<template>
<<<<<<< HEAD
  <section class="board-list">
      <h1>This is board-list component</h1>
      <form>
        <input type="text" placeholder="search">
        <button>Search</button>
      </form>
      <ul class="boards-list">
        <li v-for="board in boards" :key="board._id">
         <button @click="removeBoard(board._id)">X</button> 
         <router-link :to="'board/'+board._id">{{board.name}}</router-link>
        </li>
      </ul>
     
  </section>
=======
    <section class="board-list">
        <h1>This is board-list component</h1>
        <form>
            <input type="text" placeholder="search" />
            <button>Search</button>
        </form>
        <ul v-if="boards" class="boards-list">
            <li v-for="board in boards" :key="board._id">
                <button @click="removeBoard(board._id)">X</button>
                <router-link :to="'/board/' + board._id">{{
                    board.name
                }}</router-link>
            </li>
        </ul>
    </section>
>>>>>>> 7c14fc5de3d186fd6f0b4a77d4dc15f0899a56d6
</template>

<script>
export default {
<<<<<<< HEAD
    name: 'board-list',
    computed:{
      boards(){
        return this.$store.getters.boards;
         
      }
=======
    name: "board-list",
    computed: {
        boards() {
            return this.$store.getters.boards;
        },
>>>>>>> 7c14fc5de3d186fd6f0b4a77d4dc15f0899a56d6
    },
    methods: {
        removeBoard(boardId) {
            console.log("boardId:", boardId);
        },
    },
    created() {
        this.$store.dispatch({ type: "loadBoards" });
    },
};
</script>

