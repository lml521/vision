<template>
    <div class="com-container">
        <div class="title">地区销量趋势</div>
  <!--  {{TrendList[0].data}} -->
        <div id="myChart" ></div>
      
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    props:{
        TrendList:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    console.log(this.TrendList)
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    this.drawLine(myChart);
  },
  methods: {
    drawLine(myChart) {
        // console.log(this.TrendList[0].data)
      // 基于准备好的dom，初始化echarts实例

      // 绘制图表
      myChart.setOption({
        color: ["#0ba82c", "#2c6eff", "#16f2d9", "#fe211e", "#fa6900"],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["上海", "北京", "深圳", "广州", "重庆"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["一月", "三月", "五月", "七月", "九月", "十一月"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "上海",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.TrendList[0],
          },
          {
            name: "北京",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "深圳",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "广州",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "重庆",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
#myChart {
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

