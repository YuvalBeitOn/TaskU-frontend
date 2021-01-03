<template>
  <section class="progressbar flex">
    <div
      class="item-progressbar"
      v-for="(status, idx) in progressBarData"
      :key="idx"
      v-tooltip.top="
        status.name +
          ' ' +
          status.fraction +
          ' ' +
          Math.round(status.percentage) +
          '%'
      "
      :style="
        'width:' +
          status.percentage +
          '%;' +
          ' height:20px;' +
          ' background-color:' +
          status.statusColor +
          ';'
      "
    ></div>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    progressBarData: {
      type: Object
    }
  }
}
</script>

<style></style>
