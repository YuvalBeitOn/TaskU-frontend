<template>
  <section class="filter-form flex column justify-center">
    <h4 class="filter-title">{{ title }}</h4>
    <button @click="updateFilter">All</button>
    <button
      :style="getStyleStr(opt.color)"
      @click="updateFilter"
      v-for="opt in filteredOpts"
      :key="opt.id"
      type="submit"
    >
      {{ opt.txt }}
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
      return `backgroundColor:${colorStr}`
    },
  },
  created() {
    this.filteredOpts = this.opts.filter(opt => opt.txt)
  }
}
</script>

<style></style>
