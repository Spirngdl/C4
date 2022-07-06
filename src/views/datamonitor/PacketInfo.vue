<template>
    <div class="packetinfo-layout">
        <div class="packetNum">
            <div id="PacketNumNode" style="width:100%; height:300px"></div>
        </div>
        <div class="Bytes">
            <div id="BytesNode" style="width:100%; height:300px"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import {onMounted, onUnmounted} from "vue"

function seededRandom(seed:number):any {    
    // 根据数值进行随机值计算    
    return parseFloat('0.'+Math.sin(seed).toString().substr(6));
}
let timer:any;
function getData(data:any,i:number):any{
    const res = Math.round((Math.random() - 0.9) * 1000 + data[i - 1][1])
    if (res<0) return 0;
    else return res;
}
function getData2(data:any,i:number):any{
    const res2 = Math.round((Math.random()*Math.random()-0.5*0.5) * 20 + data[i - 1][1])
    if (res2<0) return 0;
    else return res2;
}


onMounted(()=>{
    // 挂载Frames
    var chartDom = document.getElementById('PacketNumNode');
    var chartDom2 =document.getElementById('BytesNode');
    var myChart = echarts.init(chartDom as any);
    var mychart2 =echarts.init(chartDom2 as any);
    var option:any;
    var option2:any;

    let base = +new Date(2022, 6, 5);
    let halfMinute = 30*1000;

    let data = [[base, Math.random()* 3000]]; //[时间，值]组成的数组
    let data2 = [[base, seededRandom(+new Date())*20]]; 
    
    
    for (let i = 1; i < 20000; i++) {
        let now = new Date((base += halfMinute));
        data.push([+now, getData(data,i)]);
        data2.push([+now, getData2(data2,i)]);
    }
    option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt:any) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: 'Bits per Second'
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 10000
        }
      ],
      series: [
        {
          name: 'Bits',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data
        }
      ]
    };
    
    option2 = {
      tooltip: {
        trigger: 'axis',
        position: function (pt:any) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: 'Frames per Second'
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 10000
        }
      ],
      series: [
        {
          name: 'Frames',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data2
        }
      ]
    };
    function update(){
        let dataZoom =option.dataZoom;
        let dataZoom2 =option2.dataZoom;
        dataZoom[0].start +=0.1;
        dataZoom[0].end +=0.1;
         dataZoom2[0].start +=0.1;
        dataZoom2[0].end +=0.1;
        myChart.setOption(option)
        mychart2.setOption(option2)
    }
    
    timer =setInterval(()=>{
        update();
    },50)
    
    option && myChart.setOption(option);
    option2 && mychart2.setOption(option2)
    // 挂载Bits
})

onUnmounted(()=>{
    clearInterval(timer)
})
</script>

<style scoped>
.packetNum,.Bytes{
    margin: 20px 20px 10px 10px;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
}
</style>