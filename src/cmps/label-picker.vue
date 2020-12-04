<template>
  <section class="label-picker" v-if="opts">
    <div
      class="label-picker-opt flex align-center justify-center"
      v-for="(opt, idx) in opts"
      :key="idx"
      :style="getStyleStr(opt.color)"
      @click="updateTask(opt)"
    >
      {{ opt.txt }}
    </div>
   

  </section>
</template>

<script>
export default {
  props: {
    opts: Array,
    type: String
  },
  methods: {
    getStyleStr(colorStr) {
      return `backgroundColor:${colorStr}`
    },
    updateTask(opt) {
      if (this.type === 'status') this.updateTaskStatus(opt)
      else this.updateTaskPriority(opt)
    },
    updateTaskStatus(opt) {
      this.$emit('updateTaskStatus', opt)
    },
    updateTaskPriority(opt) {
      this.$emit('updateTaskPriority', opt)
    }
  }
}
</script>
