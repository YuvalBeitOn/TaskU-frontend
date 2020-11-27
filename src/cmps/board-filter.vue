<template>
  <section class="board-filter flex space-between">
    <span class="creator flex align-center" v-if="creator">By: {{ creator.fullname }}</span>
    <div class="filter-actions flex space-between">
      <button class="add-group-btn" @click="addGroup">New Group</button>
      <span><i class="far fa-search"></i><input class="search-input" type="text" placeholder="Search" /></span>
      <div class="filter"><i class="fas fa-filter"></i>Filter</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'board-filter',
  props: {
    creator: Object
  },
  methods: {
    addGroup() {
      this.$emit('addGroup')
    }
  },
  created() {
    console.log('creator:',   );
  }
}
</script>
