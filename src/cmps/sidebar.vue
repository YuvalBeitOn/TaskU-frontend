<template>
  <section class="side-bar-nav">
    <section :class="{ 'side-bar-board-app': true, expanded: isExpanded }">
      <button class="cls-btn close-btn ">
        <i @click.stop="closeBtn" class="cls-icon fas fa-times"></i>
      </button>
      <div>
        <slot> </slot>
      </div>
    </section>
    <div @click="closeBtn" class="backdrop-layer"></div>
  </section>
</template>

<script>
export default {
  props: {
    isExpanded: Boolean
  },
  methods: {
    closeBtn() {
      this.$emit('closeBtn')
    }
  }
}
</script>
