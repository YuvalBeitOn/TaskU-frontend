<template>
    <div v-if="dataChart" id="chart-container">
      <fusioncharts
        type="doughnut2d"
        width="400"
        height="320"
        :dataSource="dataSource"
      >
      </fusioncharts>
    </div>
</template>

<script>
export default {
  name: 'chart-vue',
  props:{
    dataChart:[Array,Object],
    title:String
  },
  data() {
    return {
      dataSource: {
        chart: {
          caption: this.title,
          theme: 'fusion',
        },
        data: null,
      },
    }
  },

 mounted(){
this.dataSource.data= this.dataChart
}
}
</script>

<style>

</style>