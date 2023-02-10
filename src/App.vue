<template>
  <div id="app" >
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
  color: #fff;
  background-size: cover;
}
.com-container, .com-page,.com-chart, body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.com-container{
  position: relative;
  border-radius: 5%!important;
}
#app {
  padding: 0 20px;
  height: 100vh;
}
</style>
