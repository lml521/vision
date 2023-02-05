<template>
  <div id="app" style="background-color: rgb(22, 21, 34); color: rgb(255, 255, 255);">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
/* 定义媒体查询 */
@media screen and (max-width: 1024px) {
  html {
    font-size: 42.66px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}
html,
body {
 /* height: 100%; */
  color: #fff;
  background-size: cover;
}

#app {
  // min-height: 780px;
  // min-width: 1024px;
  // max-width: 1920px;
  // margin: 0 auto;
  padding: 0 20px;
  height: 100vh;
}
.com-container, .com-page,.com-chart, body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
