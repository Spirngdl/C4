<template>
    <div class="net-element">
        <el-tag class="ml-2" type="success">{{tableField[element].flag}}</el-tag>
        <div class="net-element-table">
            <el-table :data="network[element]" style="width: 100%" max-height="250">
                <template v-for="(field,index) in tableField[element].field">
                     <el-table-column :prop="tableField[element]['props'][index]" :label="field" />
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
            <el-button class="mt-4" style="width: 100%" @click="onAddItem">{{tableField[element].add}}</el-button>
            <el-dialog
              v-model="visible_bottom"
              title="Tips"
              width="40%"
              :before-close="handleClose"
            >
              <!-- 差一个组件（动态的） -->
              <component :is="whichComponent[element]"/>
              <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary" @click="visible_bottom = false"
                    >关闭弹窗</el-button>
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

import {useStore} from "@/store/index"

import { computed, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
const store =useStore();

let network =computed(()=>{
    return store.getters.getNetwork('new');
})
// 接收参数
const props =defineProps<{
  element:keyof typeof tableField
}>()

// 判断应该使用哪些组件
const whichComponent ={
  hosts:HostEditTable,
  switches:SwitchEditTable,
  links:LinkEditTable
}
// 判断应该添加哪个结点
const whichNode ={
  hosts:{
    id:'',
    ip:'',
    port:''
  },
  switches:{
   id:"",
   port0:'',
   port1:'',
   port2:'',
   port3:''
  },
  links:{
    id:'',
    bandWidth:0,
   end1node:'',
    end1port:'',
    end2node:'',
    end2port:''
  }
}
let visible_bottom =ref(false)
let visible_table =ref(false)


const deleteRow = (index: number) => {
  // props.network[props.element].splice(index, 1)
}

const onAddItem = () => {
  let element =props.element
  let elementObj =JSON.parse(JSON.stringify(whichNode[props.element]))
  // 新增结点（空结点）
  store.commit('addElement',{
    id:"new",
    element,
    elementObj
  })
  // 打开弹窗
  visible_bottom.value=true
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