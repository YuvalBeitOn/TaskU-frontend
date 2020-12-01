<template>
  <header class="board-header" v-if="board">
    <board-info
      @removeMember="emitRemoveMember"
      @addMember="emitAddMember"
      :board="board"
    />
    <div class="board-name-container">
      <h2
        class="board-name editable"
        spellcheck="false"
        @blur="updateBoardName"
        @keydown.enter="updateBoardName"
        contenteditable
      >
        {{ board.name }}
      </h2>
    </div>
    <h3
      class="board-descriotion editable"
      spellcheck="false"
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
  methods: {
    emitRemoveMember(member) {
      this.$emit('removeMember', member)
    },
    emitAddMember(member) {
      this.$emit('addMember', member)
    }
  },
  components: {
    boardInfo,
    boardFilter
  }
}
</script>

<style></style>
