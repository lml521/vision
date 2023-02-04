<template>
    <div class="com-container">
        <div class="title">商家销售统计</div>
        <div id="bottom" ></div>
      
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    console.log(this.TrendList)
    let myChart = this.$echarts.init(document.getElementById("bottom"));
    this.drawLine(myChart);
  },
  methods: {
    drawLine(myChart) {
      
      // 绘制图表
      myChart.setOption({

  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 87, '商家13'],
      [57.1, 99, '商家2'],
      [74.4, 99, '商家1'],
      [50.1, 102, '商家15'],
      [89.7, 127, '商家9'],
    ]
  },
  grid: { containLabel: true },
  xAxis: { name: 'amount' },
  yAxis: { type: 'category' },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: 'amount',
        // Map the "product" column to Y axis
        y: 'product'
      }
    }
  ]
     
});
    },
  },
};
</script>
<style scoped>
#bottom {
  width: 100%;
  height: 100%;
}
.title {
  position: absolute;
  left: 50px;
  top: 20px;
  z-index: 999;
  color: #fff;
  cursor: pointer;
}
</style>

