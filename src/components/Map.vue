<template>
      <div class="com-container">
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>
<script>
import axios from "axios";
import { getMapList } from "../api.js";
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
    // window.addEventListener("resize", this.screenAdapter);
    // this.screenAdapter();
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
    // this.$socket.unRegisterCallBack('sellerData')
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref);
      const res = await axios.get(
        "http://localhost:8080/static/map/china.json"
      );
      console.log(res);
      this.$echarts.registerMap('china',res.data)
      const initOption = {
        title:{
            text:'▎商家分布',
            left:20,
            top:20
        },
        geo:{
            type:'map',
            map:'china',
            top:"5%",
            bottom:"5%",
            itemStyle:{
                areaColor:'#2E72Bf',
                borderColor:'#333'
            }
        },
        legend:{
            left:'5%',
            bottom:'5%',
            orient:'vertical'
        }
      };
      this.chartInstance.setOption(initOption);
    },

    async getData() {
        let res = await getMapList();
        this.allData = res;
        console.log(res)
        this.updateChart();
    },

    updateChart() {
        const legendArr=this.allData.map(item=>{
            return item.name
        })
        const seriesArr =this.allData.map(item=>{
            return {
                type:'effectScatter',
                rippleEffect:{
                    scale:5,
                    brushType:'stroke'
                },
                name:item.name,
                data:item.children,
                coordinateSystem:'geo'
            }
        })

      const dataOption = {
        legend:{
            data:legendArr
        },
        series:seriesArr
      };
      this.chartInstance.setOption(dataOption);
    },

    // screenAdapter() {
    //   const adapterOption = {};
    //   this.chartInstance.setOption(adapterOption);
    //   this.chartInstance.resize();
    // },
  },
};
</script>
<style scoped>
</style>
