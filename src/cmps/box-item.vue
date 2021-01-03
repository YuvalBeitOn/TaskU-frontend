<template>
  <div class="box-item flex column space-between align-center">
    <h2>{{ title }}</h2>
    <div class="icon-container flex center-center">
      <i :class="`fas ${classIcon}`"></i>
    </div>
    <h3>{{ value }}</h3>
  </div>
</template>

<script>
export default {
  name: 'box-item',
  props: {
    title: String,
    value: [String, Number],
    classIcon: String
  }
}
</script>

<style></style>
