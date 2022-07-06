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
                <el-form-item>
                    <el-upload
                       v-model:file-list="fileList"
                       class="upload-demo"
                       action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                       multiple
                       :limit="1"
                     >
                        <el-button type="primary" @click="importCfg">导入配置文件</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </section>
        <section class="content">
            <NetCreateTable :element="'hosts'"></NetCreateTable>
            <NetCreateTable :element="'switches'"></NetCreateTable>
            <NetCreateTable :element="'links'"></NetCreateTable>
        </section>
        <section class="footer" style="display: flex; justify-content: center;">
            <el-button type="primary" size="default" @click="createNetwork">创建网络</el-button>
        </section>
    </div>
</template>

<script setup lang="ts">
import NetCreateTable from '@/components/NetManage/NetCreateTable.vue';
import {NetworkType} from "@/object/network/network"
import { reactive,computed,ref } from 'vue';

import type { UploadProps, UploadUserFile } from 'element-plus'

// 引入store
import {useStore} from "@/store/index"
const store =useStore();

let network =computed(()=>{
    return store.getters.getNetwork('new');
})
const createNetwork =()=>{
    // store添加到state中去
    store.commit('addNetwork',{
        id:network.value.id,
        network:network.value
    })
}

const importCfg =()=>{
    store.commit('setIsNet')
}

const fileList = ref<UploadUserFile[]>([])

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