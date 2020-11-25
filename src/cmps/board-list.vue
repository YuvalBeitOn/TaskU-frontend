<template>
  <section class="board-list">
      <h1>This is board-list component</h1>
     {{boardsDisplay}}
  </section>
</template>

<script>
export default {
    name: "board-list",
    computed:{
      boards(){
        const boards = this.$store.getters.boards;
        const boardsDisplay = boards.map(board=>{
          board = {_id:board._id,name:board.name}
          return board
        })
        return boardsDisplay;
      }
    }
  
}
</script>

