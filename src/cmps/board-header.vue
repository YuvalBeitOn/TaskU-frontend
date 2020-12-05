<template>
  <header class="board-header" v-if="board">
    <board-info
      @removeMember="emitRemoveMember"
      @addMember="emitAddMember"
      :board="board"
    />
    <!-- :contenteditable="isAllowed" -->
    <!-- @keypress="limitTextLength" -->
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
    <div class="display-mode">
      <el-select
        @change="setDisplayMode"
        :value="displayMode"
        placeholder="Display"
      >
        <label>
          <el-option class="opt" value="Board" placeholder="Board"
            ><i class="far fa-bars menu-icon"><span class="inner-txt">Board</span></i></el-option
          ></label
        >
        <label>
          <el-option class="opt" value="Canvas" placeholder="Canvas"
            ><i class="fal fa-chalkboard menu-icon"> <span class="inner-txt">Canvas</span></i></el-option
          >
        </label>
      </el-select>
    </div>
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
  data() {
    return {
      isAllowed: true
    }
  },
  computed: {
    displayMode() {
      return this.$store.getters.displayMode
    }
  },
  methods: {
    setDisplayMode(val) {
      this.$emit('setDisplayMode', val)
    },
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
