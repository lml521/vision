<template>
    <div class="com-container">
            <div class="com-chart" ref="trend_ref"></div>
        </div>
    </template>
    <script>
import { getTrend } from "../api.js";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    // this.$socket.unRegisterCallBack('sellerData')
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref);
      const initOption = {};
      this.chartInstance.setOption(initOption);
    },

    async getData() {
      let res = await getTrend();
      this.allData = res;
      this.updateChart();
    },

    updateChart() {
      const dataOption = {};
      this.chartInstance.setOption(dataOption);
    },

    screenAdapter() {
      const adapterOption = {};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>
    <style scoped>
</style>