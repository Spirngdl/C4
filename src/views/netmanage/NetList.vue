<template>
    <div class="netlist-layout">
    <el-table :data="netList" style="width: 100%">
        <el-table-column label="id" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><MostlyCloudy /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="hostNum" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.hostNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="switchNum" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.switchNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="remark" width="180">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="netVisual(scope.$index, scope.row)"
              >网络可视化</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="netDelete(scope.$index, scope.row)"
              >删除网络</el-button
            >
          </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script setup lang="ts">
import {computed, reactive, watch} from "vue"
import { MostlyCloudy } from '@element-plus/icons-vue'
import {useRouter} from "vue-router"
import {useStore} from "@/store/index"

interface NetType {
  id:string,
  hostNum:number,
  switchNum:number,
  remark:string
}

const router =useRouter();
const netVisual = (index: number, row: NetType) => {
    // 跳转到指定网络topo页面
    router.push({path:"/network:"+row.id})
}
const netDelete = (index: number, row: NetType) => {
  console.log(index, row)
}
const store =useStore();
const networks =computed(()=>{
  return store.getters['getNetworks']
})
let netList:NetType[] =[];
const generateNetList=()=>{
  netList.length=0; // 先清空
  for (let key in networks.value){
    if (key!='new'){
      netList.push({
        id:networks.value[key].id,
        remark:networks.value[key].remark,
        hostNum:networks.value[key].hosts.length,
        switchNum:networks.value[key].switches.length,
      })
    }
  }
}

generateNetList()
watch(()=>store.getters['getNetworks'],()=>{
  console.log("changed")
  generateNetList()
},{deep:true})

</script>

<style scoped>
.netlist-layout{
    margin: 20px 20px 0 20px;
    padding: 10px 0 10px 10px;
    border-radius: 10px;
    border: 1px solid rgb(151, 145, 145);
}
</style>