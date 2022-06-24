<template>
   <div class="host">
    <el-tag style="margin:10px 0 0 20px;">主机信息：</el-tag>
    <div class="host-form">
        <template v-for="(host,index) in topoData.host" :key="host.id">
         <el-form
            ref="formRef"
            :model="host"
            label-width="120px"
            :inline="true"
            style="margin-bottom:20px;"
        >
            <el-form-item
                prop="hostId"
                :label="'主机'+index+' ID:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="host.id"></el-input>
            </el-form-item>
            <el-form-item
                prop="hostIp"
                :label="'主机'+index+' IP:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="host.ip"></el-input>
            </el-form-item>
            <el-button type="primary" size="default" @click="delEntity('host',index)">删除主机</el-button>
         </el-form>
    </template>
    </div>
    <el-button type="primary" size="default" @click="addEntity('host')" style="margin:0 50%;">添加主机</el-button>
   </div>
   <div class="switch">
        <el-tag style="margin:10px 0 0 20px;">交换机信息：</el-tag>
        <div class="switch-form">
            <template v-for="(Switch,index) in topoData.switch" :key="Switch.id">
             <el-form
                ref="formRef"
                :model="Switch"
                label-width="120px"
                :inline="true"
                style=" margin-bottom:20px; display: flex; align-items: center;"
            >
                <el-form-item
                    prop="switchId"
                    :label="'交换机'+index+' ID:'"
                    :rules="switchRules"
                    style="margin-bottom: 0px;"
                >
                    <el-input v-model="Switch.id"></el-input>
                </el-form-item>
                <div class="switch-port-form">
                    <template v-for="(port,index2) in topoData.switch[index].port" :key="port.id">
                    <el-form
                        ref="formRef"
                        :model="Switch.port"
                        label-width="150px"
                        :inline="true"
                        style="margin:0px 20px 5px 0px !important; display:flex; align-items: center;"
                    >
                        <el-form-item
                            prop="switchId"
                            :label="'交换机PORT'+index2+' ID:'"
                            :rules="switchRules"
                            style="margin-bottom: 0px;"
                        >
                            <el-input v-model="port.id"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="switchId"
                            :label="'交换机PORT'+index2+' MAC:'"
                            :rules="switchRules"
                            style="margin-bottom: 0px;"
                        >
                            <el-input v-model="port.mac"></el-input>
                        </el-form-item>
                        <el-button type="primary" size="default" @click="delEntity('switch-port',index,index2)">删除交换机端口</el-button>
                    </el-form>
                </template>
                </div>
                <el-button type="primary" size="default" @click="addEntity('switch-port',index)">添加交换机端口</el-button>
                <el-button type="primary" size="default" @click="delEntity('switch',index)">删除交换机</el-button>
             </el-form>
         </template>
        </div>
        <el-button type="primary" size="default" @click="addEntity('switch')" style="margin:0 50%;">添加交换机</el-button>
   </div>
   <div class="links">
    <el-tag style="margin:10px 0 0 20px;">链路信息：</el-tag>
    <div class="host-form">
        <template v-for="(link,index) in topoData.links" :key="link.id">
         <el-form
            ref="formRef"
            :model="link"
            label-width="180px"
            :inline="true"
            style="margin-bottom:20px;"
        >
            <el-form-item
                prop="linkId"
                :label="'链路'+index+' ID:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="link.id"></el-input>
            </el-form-item>
            <el-form-item
                prop="hostIp"
                :label="'链路'+index+' 源交换机ID:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="link.source.id"></el-input>
            </el-form-item>
            <el-form-item
                prop="hostIp"
                :label="'链路'+index+' 源交换机PORT:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="link.source.port"></el-input>
            </el-form-item>
            <el-form-item
                prop="hostIp"
                :label="'链路'+index+' 目的交换机ID:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="link.target.id"></el-input>
            </el-form-item>
            <el-form-item
                prop="hostIp"
                :label="'链路'+index+' 目的交换机PORT:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="link.target.port"></el-input>
            </el-form-item>
            <el-form-item
                prop="hostIp"
                :label="'链路'+index+' 带宽:'"
                :rules="hostRules"
                style="margin-bottom: 0px;"
            >
                <el-input v-model="link.bandwidth"></el-input>
            </el-form-item>
            <el-button type="primary" size="default" @click="delEntity('links',index)">删除链路</el-button>
         </el-form>
    </template>
    </div>
    <el-button type="primary" size="default" @click="addEntity('links')" style="margin:0 50%;">添加链路</el-button>
   </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// element-plus中定义的表单实体的类型
import type { FormInstance } from 'element-plus'
// 主机结构
interface Host {
    id:string,
    ip:string
}
// 交换机结构
interface Switch {
    id:string,
    port:Array<{
        id:string,
        mac:string
    }>
}
// 链路结构
interface Links {
    id:string,
    source:{
        port:string,
        id:string
    },
    target:{
        port:string,
        id:string
    },
    bandwidth:string
}
interface TopoType {
    host:Array<Host>,
    switch:Array<Switch>,
    links:Array<Links>
}

// topo数据结构
let topoData =reactive<TopoType>({
    host:[
        {id:'',ip:''}
    ],
    switch:[
        {id:"",port:[
            {id:"",mac:""}
        ]}
    ],
    links:[
        {id:"",source:{port:"",id:""},target:{port:"",id:""},bandwidth:""}
    ]
})

//vue3中获取表单实体（用来进行表单校验）
// 三个表单（host/switch/link）
const formRef = ref<FormInstance>()
const hostRules ={}
const switchRules ={}
const addEntity =(flag:string,index?:number)=>{
    switch(flag){
        case 'host':
            topoData.host.push( {id:'',ip:''})
            break;
        case 'switch-port':
            topoData.switch[index as number].port.push({id:"",mac:""})
            break;
        case 'switch':
            topoData.switch.push( {id:"",port:[{id:"",mac:""}]})
            break;
        case 'links':
            topoData.links.push( {id:"",source:{port:"",id:""},target:{port:"",id:""},bandwidth:""})
            break;
        default:
            break;
    }
}
const delEntity =(flag:string,index:number,index2?:number)=>{
     switch(flag){
        case 'host':
            if (topoData.host.length>1)
                topoData.host.splice(index,1);
            break;
        case 'switch-port':
            if (topoData.switch[index].port.length>1)
                topoData.switch[index].port.splice(index2 as number,1);
            break;
        case 'switch':
             if (topoData.switch.length>1)
                topoData.switch.splice(index,1);
            break;
        case 'links':
            if (topoData.links.length>1)
                topoData.links.splice(index,1);
            break;
        default:
            break;
    }
}



</script>

<style scoped>
.host,.switch,.links {
    width: 90%;
    border: 1px solid #ffffff;
    border-radius: 5px;
    box-shadow: 5px 10px 5px rgba(0, 0,0,0.1);
    margin-bottom: 20px;
}
.host-form,.switch-form,.links-form{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
</style>