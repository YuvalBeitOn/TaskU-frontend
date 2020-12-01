<template>
  <header class="board-header" v-if="board">
    <board-info :board="board" />
    <h2
      class="board-name editable"
      @blur="updateBoardName"
      @keydown.enter="updateBoardName"
      contenteditable
    >
      {{ board.name }}
    </h2>
    <h3
      class="board-descriotion editable"
      v-if="board.description"
      @blur="updateBoardDesc"
      @keydown.enter="updateBoardDesc"
      contenteditable
    >
      {{ board.description }}
    </h3>
    <h4 class="board-creator">By: {{ board.creator.fullName }}</h4>

    <board-filter
      v-if="board"
      :statuses="board.statuses"
      :priorities="board.priorities"
      @addGroup="addGroup"
      @forceRerender="forceRerender"
    />
  </header>
</template>

<script>
import boardInfo from './board-info'
import boardFilter from '@/cmps/board-filter.vue'

export default {
  props: {
    updateBoardDesc: Function,
    updateBoardName: Function,
    board: Object,
    addGroup: Function,
    forceRerender: Function
  },
  components: {
    boardInfo,
    boardFilter
  }
}
</script>

<style></style>
