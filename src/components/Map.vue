<template>
      <div class="com-container" @dblclick.stop="revertMap">
        <!-- 地图 -->
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>
<script>
import axios from "axios";
import {mapState} from 'vuex'
import { getMapList } from "../api.js";
import { getProvinceMapInfo } from "@/utils/map_utils"; // 省份地图
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: [],
    };
  },
  computed: {
    ...mapState(['theme']),

  },
  watch:{
    theme(){
      this.chartInstance.dispose()
      this.initChart()
      this.screenAdapter()
      this.updateChart()
    }
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener("resize", this.screenAdapter);
    // this.$socket.unRegisterCallBack('sellerData')
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref,this.theme);
      const res = await axios.get(
        "http://localhost:8080/static/map/china.json"
      );
      console.log(res);
      this.$echarts.registerMap("china", res.data);
      const initOption = {
        title: {
          text: "▎商家分布",
          left: 20,
          top: 20,
        },
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            areaColor: "#2E72Bf",
            borderColor: "#333",
          },
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
        },
      };
      this.chartInstance.setOption(initOption);

      //   点击地图省份 调到该省份地图
      this.chartInstance.on("click", async (arg) => {
        const provinceInfo = getProvinceMapInfo(arg.name);

        if (!this.mapData[provinceInfo.key]) {
          const res = await axios.get(
            "http://localhost:8080" + provinceInfo.path
          );
          this.mapData[provinceInfo.key] = res.data;
          this.$echarts.registerMap(provinceInfo.key, res.data);
        }

        const changeOption = {
          geo: {
            map: provinceInfo.key,
          },
        };

        this.chartInstance.setOption(changeOption);
      });
    },

    // 回到中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: "china",
        },
      };
      this.chartInstance.setOption(revertOption);
    },

    async getData() {
      let res = await getMapList();
      this.allData = res;
      console.log(res);
      this.updateChart();
    },

    updateChart() {
      const legendArr = this.allData.map((item) => {
        return item.name;
      });
      const seriesArr = this.allData.map((item) => {
        return {
          type: "effectScatter",
          rippleEffect: {
            scale: 5,
            brushType: "stroke",
          },
          name: item.name,
          data: item.children,
          coordinateSystem: "geo",
        };
      });

      const dataOption = {
        legend: {
          data: legendArr,
        },

        series:seriesArr,

      };
      this.chartInstance.setOption(dataOption);
    },

    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;

      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped>
</style>
