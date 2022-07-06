<template>
    <div class="delayinfo-layout">
        <section class="header">链路剩余带宽动态变动图：</section>
        <div id="main" style="width:800px;height:600px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import {onMounted, onUnmounted} from "vue"
import {useStore} from "@/store/index"
let data:Array<any> =[]
let links:Array<any> =[]

let store =useStore();
const network =store.getters.getNetwork('0001'); //获取预期id的网络topo
for (let i=0;i<network.links.length;i++){
    links.push(network.links[i].id)
}
function getRandom(min:number,max:number){
    // 获取一个介于min和max之间的随机数
    return Math.random()*(max-min)+min;
}

for (let i = 0; i < network.links.length; ++i) {
  data.push(100);
}
let timer:any;
onMounted(()=>{
    const chartDom =document.getElementById("main");
    let myChart =echarts.init(chartDom as any);
    let option:any;
    option ={
        xAxis: {
          max: 'dataMax',
          name:"时延(ms)   "
        },
        yAxis: {
          type: 'category',
          name:"链路ID",
          data:links,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        animationDuration: 3000,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
        };      
    function update() {
      var data = option.series[0].data;
      for (var i = 0; i < data.length; ++i) {
        let random = Math.round(getRandom(-10,5));
        if (random+data[i]<=0){
            data[i] =0;
        }else if(random+data[i]>=100){
            data[i] =100;
        }else{
            data[i] +=random;
        }
      }
      myChart.setOption(option);
    }

    timer =setInterval(function() {
      update();
    }, 3000);
    option && myChart.setOption(option);
})

onUnmounted(()=>{
    clearInterval(timer)
})

</script>

<style scoped>
.delayinfo-layout{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.header{
    margin:20px 0 20px 0;
    font-size: larger;
    font-weight: 600;
}
#main{
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
}

</style>