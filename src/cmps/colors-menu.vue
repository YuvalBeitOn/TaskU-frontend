<template>
  <section class="colors-menu">
    <ul
      class="colors-container clean-list flex wrap justify-center align-center"
    >
      <li
        class="color"
        v-for="(color, idx) in colors"
        :key="idx"
        :style="{ backgroundColor: color }"
        @click="emitColor(color)"
      ></li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        '#377d50',
        '#5ac47d',
        '#a9d04b',
        '#c8b656',
        '#f8cc45',
        '#7151ca',
        '#3885bb',
        '#669bf5',
        '#ad3f55',
        '#d2505f',
        '#eb3b89',
        '#ee6e40',
        '#f2ae54',
        '#c4c4c4',
        '#0094fd',
        '#009986',
        '#3d3d3d',
        '#567c8c',
      ],
    }
  },
  methods: {
    emitColor(color) {
      this.$emit('setColor', color)
    },
  },
}
</script>

<style></style>
