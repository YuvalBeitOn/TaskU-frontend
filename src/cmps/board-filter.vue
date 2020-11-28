<template>
  <section class="board-filter flex space-between">
    <span class="creator flex align-center" v-if="creator"
      >By: {{ creator.fullName }}</span
    >
    <div class="filter-actions flex space-between">
      <button class="add-group-btn" @click="addGroup">New Group</button>
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
        <span @click="toggleFilter">Filter</span>
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
export default {
  name: 'board-filter',
  props: {
    creator: Object,
    priorities: Array,
    statuses: Array
  },
  data() {
    return {
      isFilterShowen: false
    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
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
      this.filterBy[filterObj.title] = filterObj.opt
      // this.$emit('updateFilter', this.filterBy)
      this.$store.commit({ type: 'setFilterBy', filterBy: this.filterBy })
      this.$emit('forceRerender')
    }
  },
  components: {
    filterForm
  }
}
</script>
