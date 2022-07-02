<template>
    <div class="network-layout">
      <div id="mountNode"></div>  
      <div class="network-tools">
          <el-form :inline="true" :model="pc" class="demo-form-inline">
              <el-form-item label="主机端口号：">
                <el-input v-model="pc.port" placeholder="p1" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addHost">添加主机</el-button>
              </el-form-item>
           </el-form>
            <el-form :inline="true" :model="Switch" class="demo-form-inline">
              <el-form-item label="交换机端口号：">
                <el-input v-model="Switch.port" placeholder="s1" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addSwitch">添加主机</el-button>
              </el-form-item>
           </el-form>
      </div>
    </div>
      
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue"
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

    graph.data(topoData); 
    graph.render(); 

    // 导出Graph
    Graph =graph;
})

let pc =reactive({
  port:""
})
let Switch =reactive({
  port:""
})

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
/* .network-layout {
  width:100%;
} */
</style>