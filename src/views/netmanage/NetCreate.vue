<template>
    <div class="netcreate-layout">
        <section class="header">
            <el-form :inline="true" :model="network" class="demo-form-inline">
                <el-form-item label="网络ID号：">
                  <el-input v-model="network.id" />
                </el-form-item>
                <el-form-item label="备注信息：">
                  <el-input v-model="network.remark" />
                </el-form-item>
            </el-form>
        </section>
        <section class="content">
            <NetCreateTable :network="network" :element="'hosts'"></NetCreateTable>
            <NetCreateTable :network="network" :element="'switches'"></NetCreateTable>
            <NetCreateTable :network="network" :element="'links'"></NetCreateTable>
        </section>
        <section class="footer" style="display: flex; justify-content: center;">
            <el-button type="primary" size="default" @click="createNetwork">创建网络</el-button>
        </section>
    </div>
</template>

<script setup lang="ts">
import NetCreateTable from '@/components/NetManage/NetCreateTable.vue';
import {NetworkType} from "@/object/network/network"

// 网络topo的数据结构
let network:NetworkType ={
    id:'',
    remark:"",
    hosts:[],
    switches:[],
    links:[]
}
const createNetwork =()=>{
    // 添加到全局变量中

}

</script>

<style scoped>
.netcreate-layout{
    width: 100%;
    min-height: calc(100% - 40px);
}
.netcreate-layout>.content{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.header {
    margin: 10px 0 0 10px;
}
</style>