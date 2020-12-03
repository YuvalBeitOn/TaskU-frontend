<template>
  <section class="board-search flex">
    <div
      :class="{
        'input-container relative flex align-center justify-center': true,
        'input-expanded': isInputExpanded
      }"
    >
      <i class="far fa-search search-icon"></i
      ><input
        :class="{ 'search-input': true }"
        ref="searchInput"
        @click="expandInput"
        @input="emitSearch"
        type="text"
        placeholder="Search"
        v-model="searchBoard"
      />
    </div>
    <div
      class="back-drop-layer"
      v-if="isInputExpanded"
      @click="isInputExpanded = false"
    ></div>
  </section>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'board-search',
  data() {
    return {
      searchBoard: '',
      isInputExpanded: false
      
    }
  },
  methods: {
    expandInput() {
      this.isInputExpanded = true
      this.$refs.searchInput.focus()
    },
    emitSearch() {
      const searchBoard = JSON.parse(JSON.stringify(this.searchBoard))
      this.$emit('searchBoard', searchBoard)
    }
  },
  created() {
    this.emitSearch = lodash.debounce(this.emitSearch, 500)
  }
}
</script>
