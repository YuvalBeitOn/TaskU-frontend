<template>
  <section class="colors-menu">
    <ul class="colors-container clean-list flex wrap justify-center align-center">
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
        '#f28b82',
        '#fbbc04',
        '#fff475',
        '#ccff90',
        '#cbf0f8',
        '#aecbfa',
        '#d7aefb',
        '#fdcfe8',
        '#e6c9a8',
      ]
    }
  },
  methods: {
    emitColor(color) {
      this.$emit('setColor', color)
    }
  }
}
</script>

<style></style>
