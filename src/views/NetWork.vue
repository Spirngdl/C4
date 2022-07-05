<template>
    <div class="network-layout">
      <div id="mountNode"></div>  
      <div class="network-tools"></div>
        <el-dialog
           v-model="dialogVisible"
           title="主机桌面"
           width="30%"
         >
           <span>test</span>
        </el-dialog>
    </div>
      
</template>

<script setup lang="ts">
import {onMounted, reactive,ref} from "vue"
import G6 from "@antv/g6"

// 导入数据
import {topoData} from "@/utils/topoData"
import {G6Network} from "@/utils/generateNetData"

import {downSwitchport} from "@/utils/portOperate"
import {addNode} from "@/utils/nodeOperate"
import {addEdge} from "@/utils/edgeOperate"
import {packetTransmission} from "@/utils/packetAnimate"
// layout配置
const layout ={
  type:'radial',
  preventOverlap:true,
  linkDistance:250
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

console.log(G6Network)
let Graph:any;
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

    graph.data(G6Network as any); 
    graph.render(); 

    // 导出Graph
    Graph =graph;
    graph.on("node:click",(ev:any)=>{
      const node =ev.item as any;
      if (node._cfg.id.indexOf('host')!=-1){
        dialogVisible.value =true
      }
    })
})
// 点击主机出现弹窗
const dialogVisible =ref(false)

const addHost =()=>{
  addNode(Graph,'pc',1)
}

const addSwitch =()=>{
  addNode(Graph,'switch',1)
}
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
#mountNode {
  margin: 10px 20px  10px;
  border-radius: 10px;
  border: 1px solid rgb(188, 183, 183);
  box-shadow: 1px 5px 1px rgb(188, 183, 183);
}
</style>