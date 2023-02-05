<template>
<div class="com-container">
        <div class="com-chart" ref="trend_ref"></div>
    </div>
</template>
<script>
import { getTrend } from "../api.js";
export default {
  components: {},
  data() {
    return {
     
      chartInstane: null,
      allData: null, // 从服务器中获取的所有数据
      showChoice: false, // 是否显示可选项
      choiceType: 'map', // 显示的数据类型
      titleFontSize: 0 // 指明标题的字体大小
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    // window.addEventListener("resize", this.screenAdapter);
    // this.screenAdapter();
  },

  methods: {
    initChart() {
      this.chartInstane = this.$echarts.init(this.$refs.trend_ref,'chalk');
      const initOption={
      
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }
    this.chartInstane.setOption(initOption)
},

    async getData() {
      let res = await getTrend();
      this.allData = res;
      console.log(this.allData,res)
      this.updateChart();
    },

    updateChart() {



      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      // 处理数据
      // 类目轴的数据
      const timeArr = this.allData.common.month
      // y轴的数据 series下的数据
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index]
              }, // %0的颜色值
              {
                offset: 1,
                color: colorArr2[index]
              } // 100%的颜色值
            ])
          }
        }
      })
      // 图例的数据
      const legendArr = valueArr.map(item => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }







        // const timeArr =this.allData.common
        // const valueArr =this.allData.map.data
        // const seriesArr =valueArr.map(item=>{
        //     return {
        //       name:item.name,
        //         type:"line",
        //         data:item.data,
        //         stack:'map'
        //     }
        // })
        // const legendArr =valueArr.map(item=>{
        //   return item.name
        // })
        // const dataOption ={
        //     xAris:{
        //         data:timeArr
        //     },
        //     legend:{
        //       data:legendArr
        //     },
        //     series:seriesArr,
        // }
      this.chartInstane.setOption(dataOption);
    },

    screenAdapter() {
      const adapterOption = {};
      this.chartInstane.setOption(adapterOption);
      this.chartInstane.resize();
    },
  },
};
</script>
<style scoped>
</style>
}