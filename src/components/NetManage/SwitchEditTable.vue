<template>
    <div class="edit-table-layout">
        <el-form
           ref="ruleFormRef"
           :model="switchForm"
           status-icon
           :rules="rules"
           label-width="120px"
           class="demo-ruleForm"
          label-position="left"
         >
             <el-form-item label="交换机ID" prop="id">
               <el-input v-model="switchForm.id" autocomplete="off" />
             </el-form-item>
             <template v-for="(port,index) in switchForm.ports">
                <el-form-item :label="'交换机PORT'+index" prop="port">
                    <el-input v-model="port.port" autocomplete="off" />
                    <el-button type="primary" @click="submitForm(ruleFormRef)"
                      >删除端口</el-button>
                </el-form-item>
             </template>
             <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">添加端口</el-button>
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
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

//交换机元素 
const switchForm = reactive({
  id: '',
  ports: [{
    port:""
  }]
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