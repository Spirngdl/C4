<template>
    <div id="mountNode"></div>
</template>

<script setup lang="ts">
import {onMounted} from "vue"
import G6 from "@antv/g6"

// 导入数据
import {topoData} from "@/utils/topoData"

import {downSwitchport} from "@/utils/portOperate"
import {addNode} from "@/utils/nodeOperate"
import {addEdge} from "@/utils/edgeOperate"
import {packetTransmission} from "@/utils/packetAnimate"
// layout配置
const layout ={
  type:'radial',
  preventOverlap:true,
  linkDistance:100
}
// modes配置
const modes ={
  default:['drag-node',
      //节点提示框和边提示框设置 
      {
          type:'tooltip',
          formatText(model:any) {
              // 提示框文本内容
              const text = 'label: ' + model.label;
              return text;
          },
          offset:100
      },
      {
          type:"edge-tooltip",
           formatText(model:any) {
               // 边提示框文本内容
               const text =
                 'source: ' +
                 model.source +
                 '<br/> target: ' +
                 model.target
               return text;
            },
            offset:100
      }
  ]
}
// 使用G6获取container时要确保该DON元素已经渲染完毕了，因此需要在生命周期函数中实现
onMounted(()=>{ 
    const graph = new G6.Graph({
      container:'mountNode',
        width: 1920, 
        height: 500, 
        layout,
        modes,
        defaultEdge:{
            style:{
                lineWidth:3
            }
        }
    });

    graph.data(topoData); 
    graph.render(); 

    // 事件监听
    graph.on('click',(e)=>{
      // downSwitchport(graph,'switch','s2')
      // addNode(graph,'pc',1)
      // addEdge(graph,'host1','switch')
      packetTransmission(graph)
    })
})
</script>

<style>
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>