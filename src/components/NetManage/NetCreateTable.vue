<template>
    <div class="net-element">
        <el-tag class="ml-2" type="success">{{tableField[element].flag}}</el-tag>
        <div class="net-element-table">
            <el-table :data="tableData" style="width: 100%" max-height="250">
                <template v-for="field in tableField[element].field">
                     <el-table-column :prop="field" :label="field" />
                </template>
                <el-table-column fixed="right" label="更多操作" width="240">
                  <template #default="scope">
                  <!-- 这里需要添加弹窗，还没弄 -->
                    <el-button
                        link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                        {{tableField[element].edit}}
                    </el-button>
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click.prevent="deleteRow(scope.$index)"
                    >
                      {{tableField[element].del}}
                    </el-button>
                  </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" style="width: 100%" @click="visible_bottom=true">{{tableField[element].add}}</el-button>
            <el-dialog
              v-model="visible_bottom"
              title="Tips"
              width="40%"
              :before-close="handleClose"
            >
              <!-- 差一个组件（动态的） -->
              <component :is="whichComponent[element]" />
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="visible_bottom = false">Cancel</el-button>
                  <el-button type="primary" @click="visible_bottom = false"
                    >Confirm</el-button
                  >
                </span>
              </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import LinkEditTable from "./LinkEditTable.vue"
import SwitchEditTable from "./SwitchEditTable.vue"
import HostEditTable from './HostEditTable.vue';
import {tableField,NetworkType} from "@/object/network/network"

import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
// 接收参数
const props =defineProps<{
  network:NetworkType,
  element:keyof typeof tableField
}>()

// 判断应该使用哪些组件
const whichComponent ={
  hosts:HostEditTable,
  switches:SwitchEditTable,
  links:LinkEditTable
}

let visible_bottom =ref(false)
let visible_table =ref(false)

const tableData = ref([
  {
    "主机ID": 'host-1',
    "主机IP": '192.168.1.1/24',
    "主机PORT": 'h1-01',
  }
])

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  tableData.value.push({
    "主机ID": 'host-1',
    "主机IP": '192.168.1.1/24',
    "主机PORT": 'h1-01',
  })
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要取消添加主机吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}



</script>

<style scoped>
.net-element{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 0 20px 0;
}

</style>