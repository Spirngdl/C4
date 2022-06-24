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
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >网络可视化</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除网络</el-button
            >
          </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script setup lang="ts">
import { MostlyCloudy } from '@element-plus/icons-vue'

interface NetType {
  id:string,
  hostNum:number,
  switchNum:number,
  remark:string
}

const handleEdit = (index: number, row: NetType) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: NetType) => {
  console.log(index, row)
}

const netList: NetType[] = [
  {
    id:'20220624',
    hostNum:3,
    switchNum:1,
    remark:"最简单的局域网"
  }
]
</script>

<style scoped>
.netlist-layout{
    margin: 20px 0 0 20px;
}
</style>