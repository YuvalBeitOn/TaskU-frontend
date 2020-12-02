<template>
  <section class="board-filter flex space-between">
    <div class="filter-actions flex space-between align-center">
      <button
        v-tooltip.top="'Add New group'"
        class="add-group-btn"
        @click="addGroup"
      >
        New Group
      </button>
      <span
        :class="{
          'input-container relative flex align-center justify-center': true,
          'input-expanded': isInputExpanded
        }"
        ><i class="far fa-search search-icon"></i
        ><input
          :class="{ 'search-input': true }"
          ref="searchInput"
          @click="expandInput"
          @input="updateFilterSearch"
          type="text"
          placeholder="Search"
          v-model="filterBy.searchTerm"
      /></span>
      <div class="filter relative">
        <span class="filters-txt" v-tooltip.top="'Filters'" @click="toggleFilter"
          ><i class="fal fa-filter filter-icon"></i> Filter</span
        >

        <div
          v-show="isFilterShowen"
          :class="{ 'filters flex': true, expanded: isFilterShowen }"
        >
          <filter-form
            title="Status"
            :opts="statuses"
            @updateFilter="updateFilter"
          />
          <filter-form
            title="Priority"
            :opts="priorities"
            @updateFilter="updateFilter"
          />
          <filter-users
            title="Person"
            :users="users"
            @updateFilter="updateFilter"
          />
        </div>
        <div
          class="back-drop-layer"
          v-if="isFilterShowen || isInputExpanded"
          @click.stop="closePopUps"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import filterForm from './filter-form'
import filterUsers from './filter-users'

export default {
  name: 'board-filter',
  props: {
    priorities: Array,
    statuses: Array
  },
  data() {
    return {
      isFilterShowen: false,
      newItem: null,
      isInputExpanded: false
    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    },
    users() {
      return this.$store.getters.users
    }
  },
  methods: {
    expandInput() {
      this.isInputExpanded = true
      this.$refs.searchInput.focus()
    },
    addGroup() {
      this.$emit('addGroup')
    },
    toggleFilter() {
      this.isFilterShowen = !this.isFilterShowen
    },
    updateFilterSearch() {
      this.$store.commit({ type: 'setFilterBy', filterBy: this.filterBy })
      this.$emit('forceRerender')
      // this.$refs.searchInput.blur()
    },
    updateFilter(filterObj) {
      this.filterBy[filterObj.title] = filterObj.opt
      this.$store.commit({ type: 'setFilterBy', filterBy: this.filterBy })
      this.$emit('forceRerender')
      this.isFilterShowen = false
    },
    closePopUps() {
      this.isFilterShowen = false
      this.isInputExpanded = false
    }
  },
  components: {
    filterForm,
    filterUsers
  }
}
</script>
