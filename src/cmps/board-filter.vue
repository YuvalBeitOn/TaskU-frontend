<template>
  <section class="board-filter flex space-between">
    <span class="creator flex align-center" v-if="creator"
      >By: {{ creator.fullName }}</span
    >
    <div class="filter-actions flex space-between">
      <button class="add-group-btn" @click="addGroup">New Group</button>
      <span
        ><i class="far fa-search"></i
        ><input class="search-input" type="text" placeholder="Search"
      /></span>
      <div class="filter">
        <i class="fas fa-filter"></i>
        <span @click="toggleFilter">Filter</span>
        <div class="filters flex" v-if="isFilterShowen">
          <form @submit.prevent="updateFilter" class="filter-status flex column justify-center">
            <h4>Status</h4>
            <button type="submit">Done</button>
            <button type="submit">Working on it</button>
            <button type="submit">Stuck</button>
          </form>
          <form class="filter-priority flex column justify-center">
            <h4>Priority</h4>
            <button>Low</button>
            <button>Medium</button>
            <button>High</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'board-filter',
  props: {
    creator: Object
  },
  data() {
    return {
      // filterBy: {status: },
      isFilterShowen: false
    }
  },
  methods: {
    addGroup() {
      this.$emit('addGroup')
    },
    toggleFilter() {
      this.isFilterShowen = !this.isFilterShowen
    },
    updateFilter(ev){
      console.log(ev.submitter.innerText);
      // this.$store.dispatch({
      //           type: "setFilterBy",
      //           filterBy: ev.target.innerText,
      //       });
    }
  },
  created() {
    console.log('creator:')
  }
}
</script>
