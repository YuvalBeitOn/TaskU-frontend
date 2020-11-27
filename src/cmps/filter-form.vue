<template>
  <section class="filter-status flex column justify-center">
    <h4>{{ title }}</h4>
    <button
      @click="updateFilter"
      v-for="opt in opts"
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

      }
  },
  methods: {
    updateFilter(ev) {
      const txt = ev.target.innerText
      const filterObj = { title: this.title.toLowerCase(), opt: txt }
      //   console.log('filterObj:', filterObj);
      this.$emit('updateFilter', filterObj)
    }
  }
}
</script>

<style></style>
