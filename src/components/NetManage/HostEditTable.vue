<template>
    <div class="edit-table-layout">
        <el-form
           ref="ruleFormRef"
           :model="hostInfo"
           status-icon
           :rules="rules"
           label-width="120px"
           label-position="left"
           class="demo-ruleForm"
         >
          <el-form-item label="主机ID" prop="id">
             <el-input v-model="hostInfo.id" autocomplete="off" />
           </el-form-item>
           <el-form-item label="主机IP" prop="ip">
             <el-input v-model="hostInfo.ip" autocomplete="off"/>
           </el-form-item>
           <el-form-item label="主机PORT" prop="port">
             <el-input v-model="hostInfo.port" />
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="submitForm(ruleFormRef)"
               >提交</el-button
             >
             <el-button @click="resetForm(ruleFormRef)">重置</el-button>
           </el-form-item>
         </el-form>
    </div>
</template>

<script setup lang="ts">
// 该组件用于网络元素编辑
import { reactive, ref,computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { store } from '@/store';


// 获取指定元素列表的最后一个元素
let hostInfo =computed(()=>{
  return store.getters.getElementList('hosts')
})

const ruleFormRef = ref<FormInstance>() //获取form组件

const validatePort = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the PORT'))
  }
}

const validateIP = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the IP'))
  } 
  // 检测IP地址格式是否正确
}
const validateID = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the ID'))
  } 
  // 检测ID是否唯一
}


const rules = reactive({
  id: [{ validator: validateID, trigger: 'blur' }],
  ip: [{ validator: validateIP, trigger: 'blur' }],
  port: [{ validator: validatePort, trigger: 'blur' }],
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>

</style>