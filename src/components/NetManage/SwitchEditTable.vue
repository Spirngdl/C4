<template>
    <div class="edit-table-layout">
        <el-form
           ref="ruleFormRef"
           :model="switchInfo"
           status-icon
           :rules="rules"
           label-width="120px"
           class="demo-ruleForm"
          label-position="left"
         >
             <el-form-item label="交换机ID" prop="id">
               <el-input v-model="switchInfo.id" autocomplete="off" />
             </el-form-item>
              <el-form-item label="交换机PORT0" prop="port0">
                    <el-input v-model="switchInfo.port0" autocomplete="off" />
                    <!-- <el-button type="primary" @click="submitForm(ruleFormRef)"
                      >删除端口</el-button> -->
                </el-form-item>
               <el-form-item label="交换机PORT1" prop="port1">
                    <el-input v-model="switchInfo.port1" autocomplete="off" />
                </el-form-item>
                 <el-form-item label="交换机PORT2" prop="port2">
                    <el-input v-model="switchInfo.port2" autocomplete="off" />
                </el-form-item>
                 <el-form-item label="交换机PORT3" prop="port3">
                    <el-input v-model="switchInfo.port3" autocomplete="off" />
                </el-form-item>
             <!-- <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">添加端口</el-button>
              </el-form-item> -->
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
import {useStore} from "@/store/index"

const store =useStore()
const ruleFormRef = ref<FormInstance>()

// 获取指定元素列表的最后一个元素
let switchInfo =computed(()=>{
  return store.getters.getElementList('switches')
})

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } 
}


const rules = reactive({
  id: [{ validator: validatePass, trigger: 'blur' }],
  port: [{ validator: validatePass2, trigger: 'blur' }],
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