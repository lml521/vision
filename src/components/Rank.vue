<template>
 <div class="com-container" >
      <div class="com-chart" ref="rank_ref"></div>
    </div>
</template>
<script>
import { getRank } from "../api.js";
import {mapState} from 'vuex'
export default {
    data() {
    return {
      chartInstance: null,
      allData: null,
      startValue:0,//区域缩放起点值
      endValue:9,//区域缩放终点值
      timerId:null,//定时器
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
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId)
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref,this.theme);
      const initOption = {
        title:{
            text:'▎地区销售排行',
            left:20,
            top:20,
        },
        grid:{
            top:'40%',
            left:'5%',
            right:'5%',
            bottom:'5%',
            containLabel:true
        },
        xAxis:{
            type:'category'
        },
        yAxis:{
            type:'value'
        },
        series:[
            {
                type:'bar'
            }
        ]

      };
      this.chartInstance.setOption(initOption);

      this.chartInstance.on('mouseover',()=>{
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout',()=>{
        this.startInterval()
      })
    },

    async getData() {
      let res = await getRank();
      this.allData = res;
      this.allData.sort((a,b)=>{
        return b.value-a.value
      })
      console.log(res)
      this.updateChart();
      this.startInterval()
    },

    updateChart() {
        const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]

        // 使用省份形成的数据
      const provinceArr =this.allData.map(item=>{
        return item.name
      })
    //   使用省份对应的数据
      const valueArr =this.allData.map(item=>{
        return item.value
      })
      console.log(provinceArr,valueArr)
      const dataOption = {
        xAxis:{
            data:provinceArr
        },
        dataZoom:{
            show:false,
            startValue:this.startValue,
            endValue:this.endValue,
        },
        series:[
            {
                data:valueArr,
                itemStyle:{
                    color:arg=>{
                        let targetColorArr=null
                        if(arg.value>300){
                            targetColorArr=colorArr[0]
                        }else if(arg.value>200){
                            targetColorArr=colorArr[1]
                        }else{
                            targetColorArr=colorArr[2]
                        }

                        return new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:targetColorArr[0]
                            }, {
                                offset:1,
                                color:targetColorArr[1]
                            }
                        ])

                    }
                }
            }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },

    screenAdapter() {
        const titleFontSize=this.$refs.rank_ref.offsetWidth/100*3.6
        const adapterOption={
            title:{
                textStyle:{
                  fontSize:titleFontSize
                }
            },
            series:[
                {
                    barWidth:titleFontSize,
                    itemStyle:{
                        barBorderRadius:[titleFontSize/2,titleFontSize/2,0,0]
                    }
                }
            ]
        }
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval(){
        if(this.timerId){
            clearInterval(this.timeId)
        }
      this.timerId = setInterval(()=>{
            this.startValue++
            this.endValue++
            if(this.endValue>this.endValue.length-1){
                this.startValue=0
                this.endValue=9
            }
            this.updateChart()
        },2000)
    }
  },
};
</script>
<style scoped>
</style>
}