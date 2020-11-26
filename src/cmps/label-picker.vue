<template>
  <section class="label-picker" v-if="opts">
        <div class="label-picker-opt flex align-center justify-center" v-for="(opt,idx) in opts" :key="idx" :style="getStyleStr(opt.color)">{{opt.txt}}</div>
  </section>
</template>

<script>
export default {
props: {
  opts: Array
},
methods: {
  getStyleStr(colorStr) {
    return `backgroundColor:${colorStr}`
  }
}
}


</script>

