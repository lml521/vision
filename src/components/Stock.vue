<template>
    <div class="com-container" :style="comStyle">
        <div class="com-chart" ref="stock_ref"></div>
    </div>
</template>
<script>
import {getStock} from '@/api.js'
export default {
    data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, // 当前显示的数据
      timerId: null // 定时器的标识
    };
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
    // this.$socket.unRegisterCallBack('sellerData')
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref,'chalk');
      const initOption = {
        title:{
            text:'▎库存和销量分析',
            left:20,
            top:20,
        }
      };
      this.chartInstance.setOption(initOption);
      // 对图表对象进行鼠标事件的监听
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },

    async getData() {
      let res = await getStock();
      this.allData = res;
      console.log(res)
      this.updateChart();
      this.startInterval()
    },

    updateChart() {
        const centeArr=[
            ['18%','40%'],
            ['50%','40%'],
            ['82%','40%'],
            ['34%','75%'],
            ['66%','75%']
        ]
        const colorArr=[
            ['#4FF778','#0BA82C'],
            ['#E5DD45','#E8B11C'],
            ['#E8821C','#E55445'],
            ['#5052EE','#AB6EE5'],
            ['#23E5E5','#2E72BF']
        ]

        const  start=this.currentIndex*5
        const end =(this.currentIndex+1)*5

        const showData=this.allData.slice(start,end)
        const seriesArr =showData.map((item,index)=>{
            return {
                type:'pie',
                radius:[110,100],
                hoverAnimation: false,
                center:centeArr[index],
                labelLine:{
                    show:false
                },
                label:{
                    position:'center',
                    color:colorArr[index][0]
                },
                data:[
                    {
                        name:item.name+'\n'+'\n'+item.sales,
                        value:item.sales,
                        itemStyle:{
                            color:new this.$echarts.graphic.LinearGradient(0,1,0,0,[
                                {
                                    offset:0,
                                    color:colorArr[index][0]
                                },
                                {
                                    offset:0,
                                    color:colorArr[index][1]
                                }
                            ])
                        }
                    },{
                        value:item.stock,
                        itemStyle: {
                color: '#333843'
              }
                    }
                ]
            }
        })
      const dataOption = {
        series:seriesArr
      };
      this.chartInstance.setOption(dataOption);
    },

    screenAdapter () {
      const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
      const innerRadius = titleFontSize * 2.8
      const outterRadius = innerRadius * 1.125
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },

    startInterval(){
        if(this.timerId){
            clearInterval(this.timerId)
        }
       
        this.timerId=setInterval(()=>{
            this.currentIndex++
            if(this.currentIndex>1){
                this.currentIndex=0
            }
            this.updateChart()
        },5000)
    }
  },
}
</script>
<style scoped>
</style>