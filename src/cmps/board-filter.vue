<template>
  <!-- <section class="board-filter flex space-between"> -->
    <section class="board-filters flex">
        
      <button  v-tooltip.top="'Show static'"   class="add-group-btn"  @click="toggleDashboard">Dashboard</button>
        <dashboard-modal @closeDashboard="isDashboardShown=false" v-if="isDashboardShown" />

      <button
        v-tooltip.top="'Add New group'"
        class="add-group-btn"
        @click="addGroup"
      >
        New Group
      </button>
        <i  @click="addGroup" class="fal fa-plus-circle add-btn-narrow-mode"  v-tooltip.top="'Add New group'"></i>
      <span
        :class="{
          'input-container relative flex align-center justify-center': true
        }"
        ><i class="far fa-search search-icon"></i
        ><input
          :class="{ 'search-input': true }"
          ref="searchInput"
          @input="updateFilterSearch"
          type="text"
          placeholder="Search"
          v-model="filterBy.searchTerm"
      /></span>
        <button class="filters-btn" v-tooltip.top="'Filters'" @click="toggleFilter"
          ><i class="fal fa-filter filter-icon"></i> Filter</button>
      <div class="filter-modal ">
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
          v-if="isFilterShowen"
          @click.stop="closePopUps"
        ></div>
      </div>
  </section>
</template>

<script>
import filterForm from './filter-form'
import filterUsers from './filter-users'
import dashboardModal from './dashboard'

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
      isDashboardShown:false,

    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    },
    users() {
      return this.$store.getters.miniUsers
    }
  },
  methods: {
        toggleDashboard(){
      this.isDashboardShown = !this.isDashboardShown
    },
    // expandInput() {
    //   this.isInputExpanded = true
    //   this.$refs.searchInput.focus()
    // },
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
    }
  },
  components: {
    filterForm,
    filterUsers,
    dashboardModal
  }
}
</script>
        <i @click="toggleDashboard" class="nav-icon far fa-chart-line"></i>
