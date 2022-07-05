<template>
    <div class="hostlist-layout">
        <section class="header">
            <span>选择网络拓扑ID：</span>
            <el-cascader v-model="value" :options="options"/>
        </section>
        <section class="content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="交换机ID" />
              <el-table-column prop="manage" label="ManageAddress" width='255px'/>
              <el-table-column prop="driver" label="Driver" />
              <el-table-column prop="sid" label="SID" />
              <el-table-column prop="mac" label="MAC地址" />
              <el-table-column prop="port0" label="(0)端口" />
              <el-table-column prop="port1" label="(1)端口" />
              <el-table-column prop="port2" label="(2)端口" />
              <el-table-column prop="port3" label="(3)端口" />
            </el-table>
        </section>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive, watch} from "vue"
import {generateSwitchList} from "@/utils/deviceTable/switchList"
import {useStore} from "@/store/index"

const store =useStore();
const networks =store.getters['getNetworks'];

let options:Array<any> =reactive([])
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
let value =ref('')

let tableData:any =reactive([])

watch([value],()=>{
    console.log('changed')
    // 先清空
    tableData.length =0;
    // 循环添加，防止失去
    let middletableData =generateSwitchList(value.value)
    middletableData.forEach((item:any)=>{
        tableData.push(item)
    })
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
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
    margin: 10px 20px 0 10px;
    padding-left: 30px;
}

</style>