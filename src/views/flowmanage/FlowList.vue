<template>
    <div class="hostlist-layout">
        <section class="header">
            <span>选择网络拓扑ID：</span>
            <el-cascader v-model="value" :options="options" style="margin-right: 20px;"/>
             <span>选择相应交换机ID：</span>
            <el-cascader v-model="Switch" :options="SwitchOptions"/>
        </section>
        <section class="content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="ID" />
              <el-table-column prop="manage" label="GroupID" width='255px'/>
              <el-table-column prop="driver" label="Priority" />
              <el-table-column prop="sid" label="deviceID" />
              <el-table-column label="Instructions">
                    <el-table-column prop="manage" label="Type" />
                    <el-table-column prop="driver" label="SubType" />
                    <el-table-column prop="sid" label="ActionID" />
                    <el-table-column prop="sid" label="ActionParams" />
              </el-table-column>
              <el-table-column label="Matches">
                    <el-table-column prop="sid" label="Type" />
                    <el-table-column prop="manage" label="Field"/>
                    <el-table-column prop="driver" label="Match" />
                    <el-table-column prop="sid" label="Value" />
              </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive, watch} from "vue"

import {useStore} from "@/store/index"

const store =useStore();
const networks =store.getters['getNetworks'];

let options:Array<any> =reactive([])
let SwitchOptions:Array<any> =reactive([])
// 获取网络拓扑ID
const initOptions =()=>{
    const keys =Object.keys(networks);
    keys.forEach((key:string)=>{
        if (key!='new'){
            options.push({
                value:key,
                label:key
            })
        }
    })
}
initOptions()
const initSwitchOptions =(id:string)=>{
    // 先清空
    SwitchOptions.length =0;
    if (value.value=='') {
        console.log('kong??')
        return;    
    }
    // 获取switches的id添加进去
    networks[id].switches.forEach((item:any)=>{
        SwitchOptions.push({
            value:item.id,
            label:item.id
        })
    })
}
let value =ref('')
let Switch =ref('')

let tableData:any =reactive([])

watch([value],()=>{
    console.log('changed')
    // 更换SwitchOptions的值
    initSwitchOptions(value.value);
    // 更新展示的流表信息的值
   
})

</script>

<style scoped>
.header{
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
    margin: 10px 20px 0 10px;
    padding-left: 30px;
}
.header>span{
    font-size: large;
    font-weight: 500;
}
.content {
    margin-top: 30px;
    margin-right: 20px;
    margin-left: 10px;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
    /* margin: 10px 20px 0 10px; */
    /* padding-left: 30px; */
}

</style>