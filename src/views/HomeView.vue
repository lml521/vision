<template>
  <div class="home" :style="containerStyle">

    <!-- 头部数据  -->
   <div class="header" >
    <div>
      <img :src="headerSrc" style="width:100%"></img>
    </div>
    <span class="logo">
      <img :src="logoSrc">
    </span>
    <span class="title">电商平台实时监控系统</span>
    <span class="title-right">
      <img :src="themeSrc" alt="" class="qiehuan"
      @click="handleChangeTheme">
     <span class="datetime"> {{ date }}</span>
    </span>
   </div>


   <!-- 图表 容器  -->
   <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
          <!-- 销量趋势图表 -->
           <Trend ref="trend"></Trend>
          <div class="resize">
            <span @click="changeSize('trend')" :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"></Seller>
          <div class="resize">
            <span @click="changeSize('seller')"  :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('map')"
            :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="middle-bottom"  :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('rank')" 
             :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top"  :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <!-- icon-compress-alt -->
          <span @click="changeSize('hot')"  :class="['iconfont', fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="right-bottom"  :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('stock')"  :class="['iconfont', fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
const dayjs = require("dayjs");
import { getThemeValue } from "../utils/theme_utils.js";

import Hot from "@/components/Hot.vue";
import Map from "@/components/Map.vue";
import Rank from "@/components/Rank.vue";
import Seller from "@/components/seller.vue";
import Stock from "@/components/Stock.vue";
import Trend from "@/components/Trend.vue";
import { mapState } from "vuex";

export default {
  components: {
    Hot,
    Map,
    Rank,
    Seller,
    Stock,
    Trend,
  },
  data() {
    return {
      date: null,
      list: 123,
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false,
      },
    };
  },
  computed: {
    ...mapState(["theme"]),
    logoSrc() {
      return "/static/img/" + getThemeValue(this.theme).logoSrc;
    },
    headerSrc() {
      return "/static/img/" + getThemeValue(this.theme).headerBorderSrc;
    },
    themeSrc() {
      return "/static/img/" + getThemeValue(this.theme).themeSrc;
    },
    containerStyle() {
      let backgrounds = getThemeValue(this.theme).backgroundColor;
      let titles = getThemeValue(this.theme).titleColor;
      console.log(backgrounds, titles);
      return {
        backgroundColor: backgrounds,
        color: titles,
      };
    },
  },
  created() {
    this.initTime();
  },
  methods: {
    // 设置 时间
    initTime() {
      this.date = dayjs().format("YYYY.MM.DD HH:mm:ss");
      setInterval(() => {
        this.date = dayjs().format("YYYY.MM.DD HH:mm:ss");
      }, 1000);
    },

    changeSize(chartName) {
      this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName];

      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter();
      });
    },
    handleChangeTheme() {
      this.$store.commit("changeTheme");
    },
  },
};

</script>

<style  scoped>
.home {
  padding: 0 20px;
  height: 100%;
}
.header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
}
.height > div img {
  width: 100%;
}
.logo {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-80%);
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 20px;
  transform: translate(-50%, -50%);
}
.title-right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-80%);
}
.qiehuan {
  width: 28px;
  height: 21px;
  cursor: pointer;
}
.datetime {
  font-size: 15px;
  margin-left: 10px;
}

.screen-body {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  margin-top: 10px;
}

.screen-left {
  height: 100%;
  width: 27.6%;
}
.left-top {
  height: 53%;
  position: relative;
  background-color: #222733;
  border-radius: 20px;
}

.left-bottom {
  height: 30%;
  margin-top: 20px;
  position: relative;
  background-color: #222733;
  border-radius: 20px;
}

.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522 !important;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
}
.screen-header div img {
  width: 100%;
}

.title {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 20px;
  transform: translate(-50%, -50%);
}
.title-right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-80%);
}
.qiehuan {
  width: 28px;
  height: 21px;
  cursor: pointer;
}
.datetime {
  font-size: 15px;
  margin-left: 10px;
}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
}
.screen-body .screen-left {
  height: 100%;
  width: 27.6%;
}

.screen-left #left-top {
  height: 53%;
  position: relative;
}
.screen-left #left-bottom {
  height: 31%;
  margin-top: 25px;
  position: relative;
}

.screen-middle {
  height: 100%;
  width: 41.5%;
  margin-left: 1.6%;
  margin-right: 1.6%;
}
.screen-middle #middle-top {
  width: 100%;
  height: 56%;
  position: relative;
}
.screen-middle #middle-bottom {
  margin-top: 25px;
  width: 100%;
  height: 28%;
  position: relative;
}

.screen-right {
  height: 100%;
  width: 27.6%;
}
.screen-right #right-top {
  height: 46%;
  position: relative;
}
.screen-right #right-bottom {
  height: 38%;
  margin-top: 25px;
  position: relative;
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>

