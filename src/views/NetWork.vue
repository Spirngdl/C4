<template>
    <div class="network-layout">
      <div id="mountNode"></div>  
      <div class="network-tools">
        <!-- 基本功能：down掉交换机，增删主机，链路连接，通信路径的显示 -->
        <el-form :inline="true" :model="LinkDown" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px; margin-top: 20px;" >
         <el-form-item label="###断开链路##" id="title">
            <el-form-item label="#链路ID：">
              <el-input v-model="LinkDown.id" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="default" @click="downLink">断开链路</el-button>
            </el-form-item>
         </el-form-item>
        </el-form>
         <el-form :inline="true" :model="HostDel" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px;">
          <el-form-item label="###删除主机##" id="title">
             <el-form-item label="#主机ID：">
               <el-input v-model="HostDel.id" />
             </el-form-item>
             <el-form-item>
               <el-button type="primary" size="default" @click="delHost">删除主机</el-button>
             </el-form-item>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="SwitchDel" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px;">
          <el-form-item label="##删除交换机#" id="title">
             <el-form-item label="交换机ID：">
               <el-input v-model="SwitchDel.id" />
             </el-form-item>
             <el-form-item>
               <el-button type="primary" size="default" @click="delSwitch">删除交换机</el-button>
             </el-form-item>
          </el-form-item>
        </el-form>
         <el-form :inline="true" :model="HostNew" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px;">
         <el-form-item label="###创建主机##" id="title">
            <el-form-item label="#主机ID：">
              <el-input v-model="HostNew.id" />
            </el-form-item>
            <el-form-item label="## 主机IP：">
              <el-input v-model="HostNew.ip" />
            </el-form-item>
             <el-form-item label="#主机PORT：">
              <el-input v-model="HostNew.port" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="default" @click="newHost">创建主机</el-button>
            </el-form-item>
         </el-form-item>
        </el-form>   
         <el-form :inline="true" :model="SwitchNew" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px;">
         <el-form-item label="##创建交换机#" id="title">
            <el-form-item label="交换机ID：">
              <el-input v-model="SwitchNew.id" />
            </el-form-item>
            <el-form-item label="交换机SID：">
              <el-input v-model="SwitchNew.sid" />
            </el-form-item>
             <el-form-item label="交换机MAC：">
              <el-input v-model="SwitchNew.mac" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="default" @click="newSwitch">创建交换机</el-button>
            </el-form-item>
         </el-form-item>
        </el-form>
         <el-form :inline="true" :model="LinkNew" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px;">
         <el-form-item label="##创建链路 ##" id="title">
            <el-form-item label="端结点ID：">
              <el-input v-model="LinkNew.sourceId" />
            </el-form-item>
            <el-form-item label="#端结点ID ：">
              <el-input v-model="LinkNew.targetId" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="default" @click="newLink">创建链路</el-button>
            </el-form-item>
         </el-form-item>
        </el-form>
      </div>
        <el-dialog
           v-model="dialogVisible"
           title="主机桌面"
           width="30%"
         >
           <el-form :inline="true" :model="CommunicateHost" class="demo-form-inline" style="margin-left: 20px; margin-bottom: 5px;">
            <el-form-item label="主机通信" id="title">
               <el-form-item label="目的主机ID：">
                 <el-input v-model="CommunicateHost.id" />
               </el-form-item>
               <el-form-item>
                 <el-button type="primary" size="default" @click="Communicate">开始通信</el-button>
               </el-form-item>
            </el-form-item>
            </el-form>
        </el-dialog>
    </div>
      
</template>

<script setup lang="ts">
import {onMounted, reactive,ref} from "vue"
import G6 from "@antv/g6"

// 导入数据
import {G6Network} from "@/utils/generateNetData"

import {addNode} from "@/utils/nodeOperate"
import {addEdge,delEdge} from "@/utils/edgeOperate"
import {packetTransmission,paths} from "@/utils/packetAnimate"
// layout配置
const layout ={
  type:'radial',
  preventOverlap:true,
  linkDistance:350
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
let HostClick:any;
// 使用G6获取container时要确保该DON元素已经渲染完毕了，因此需要在生命周期函数中实现 
onMounted(()=>{ 
    const graph = new G6.Graph({
      container:'mountNode',
        width: 1920, 
        height: 600, 
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
        // 获取点击主机的id，便于后续通信
        HostClick =node._cfg.id;
        dialogVisible.value =true
      }
    })
})
// 点击主机出现弹窗
const dialogVisible =ref(false)
let LinkDown =reactive({id:''})
let HostDel =reactive({id:''})
let SwitchDel =reactive({id:""})
let HostNew =reactive({id:"",ip:"",port:""})
let SwitchNew =reactive({id:"",sid:"",mac:""})
let LinkNew =reactive({sourceId:"",targetId:""})
let CommunicateHost =reactive({id:""})
const downLink =()=>{
  delEdge(Graph,LinkDown.id)
}
const delHost =()=>{}
const delSwitch =()=>{}
const newHost =()=>{
  addNode(Graph,'pc',parseInt(HostNew.id))
}
const newSwitch =()=>{
  addNode(Graph,'switch',parseInt(SwitchNew.id))
}
const newLink =()=>{
  addEdge(Graph,LinkNew.sourceId,LinkNew.targetId)
}
const Communicate =()=>{
  // 通信双方均已确定（HostClick和CommunicateHost.id）
  packetTransmission(Graph,HostClick,CommunicateHost.id)
  dialogVisible.value =false;
}
</script>

<style>
#title>.el-form-item__label{
  font-size: larger;
  font-weight: 600;
}
</style>

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