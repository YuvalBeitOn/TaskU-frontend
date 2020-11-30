<template>
  <section class="board-filter flex space-between">
    <div class="filter-actions flex space-between align-center">
      <button v-tooltip.top="'Add New Group'" class="add-group-btn" @click="addGroup">New Group</button>
      <span
        ><i class="far fa-search"></i
        ><input
          @input="updateFilterSearch"
          class="search-input"
          type="text"
          placeholder="Search"
          v-model="filterBy.searchTerm"
      /></span>
      <div class="filter">
        <i class="fas fa-filter"></i>
        <span v-tooltip.top="'Filter Board'" @click="toggleFilter">Filter</span>
        <div class="filters flex" v-if="isFilterShowen">
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
          v-if="isFilterShowen"
          @click="toggleFilter"
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
      newItem: null
    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    },
    users() {
      console.log('users:', this.$store.getters.users)
      return this.$store.getters.users
    }
  },
  methods: {
    addGroup() {
      this.$emit('addGroup')
    },
    toggleFilter() {
      this.isFilterShowen = !this.isFilterShowen
    },
    updateFilterSearch() {
      this.$store.commit({ type: 'setFilterBy', filterBy: this.filterBy })
      this.$emit('forceRerender')
    },
    updateFilter(filterObj) {
      console.log('filterObj:', filterObj);
      this.filterBy[filterObj.title] = filterObj.opt
      this.$store.commit({ type: 'setFilterBy', filterBy: this.filterBy })
      this.$emit('forceRerender')
    }
  },
  components: {
    filterForm,
    filterUsers
  }
}
</script>
