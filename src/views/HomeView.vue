<template>
  <div class="home" >

    <!-- 头部数据  -->
   <div class="header" >
    <div>
      <img src="../assets/header_border.png" style="width:100%"></img>
    </div>
    <span class="logo">bookbook</span>
    <span class="title">电商平台实时监控系统</span>
    <span class="title-right">
      <img src="../assets/下载.png" alt="" class="qiehuan">
      <img src="../assets/下载 (1).png" alt="" class="qiehuan" style="display: none"></img>
     <span class="datetime"> {{ date }}</span>
    </span>
   </div>


   <!-- 图表 容器  -->
   <div class="screen-body">
    <div class="screen-left">
        <div class="left-top">
          <!-- 地区销量趋势图 -->
          <leftTop :TrendList="TrendList"></leftTop>
    </div>
    <div class="left-bottom">
          <!-- 地区销量趋势图 -->
          <leftBottom></leftBottom>
    </div>

   </div>


  </div>

  </div>
</template>

<script>
import { getTrend} from "../api.js";
import leftTop from "../components/leftTop.vue"
import leftBottom from "../components/leftBottom.vue"
const dayjs = require("dayjs");

export default {
  components: {
    leftTop,
    leftBottom
  },
  data() {
    return {
      date: null,
      TrendList:[],//地区销量趋势图 数据
    };
  },
  created() {
    this.initTime();

    this.getTrend()
   
  },
  methods: {
    // 设置 时间
    initTime() {
      this.date = dayjs().format("YYYY.MM.DD HH:mm:ss");
      setInterval(() => {
        this.date = dayjs().format("YYYY.MM.DD HH:mm:ss");
      }, 1000);
    },
    async getTrend(){
    let res=  await getTrend()
    console.log(res.map.data)
    if(res){
this.TrendList=res.map.data
     console.log(this.TrendList)
    }
     
    }
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

.left-bottom{
  height: 30%;
  margin-top: 20px;
  position: relative;
  background-color: #222733;
  border-radius: 20px;
}
</style>

