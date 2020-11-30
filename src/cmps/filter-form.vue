<template>
  <section class="filter-form flex column">
    <h4 class="filter-title">{{ title }}</h4>
    <button class="filter-btn" @click="updateFilter">All</button>
    <button
      class="filter-btn relative"
      @click="updateFilter"
      v-for="opt in filteredOpts"
      :key="opt.id"
      type="submit"
    >
      <span class="filter-txt">{{ opt.txt }}</span>
      <span :style="getStyleStr(opt.color)" class="status-circle"></span>
    </button>
  </section>
</template>

<script>
export default {
  props: {
    opts: Array,
    title: String
  },
  data() {
    return {
      filteredOpts: null
    }
  },
  methods: {
    updateFilter(ev) {
      const txt = ev.target.innerText
      const filterObj = { title: this.title.toLowerCase(), opt: txt }
      this.$emit('updateFilter', filterObj)
    },
    getStyleStr(colorStr) {
      return `backgroundColor:${colorStr}; border-color:${colorStr};`
    }
  },
  created() {
    this.filteredOpts = this.opts.filter(opt => opt.txt)
  }
}
</script>

<style></style>
