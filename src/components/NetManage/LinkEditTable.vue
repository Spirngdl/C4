<template>
    <div class="edit-table-layout">
        <el-form
           ref="ruleFormRef"
           :model="linkInfo"
           status-icon
           :rules="rules"
           label-width="120px"
           class="demo-ruleForm"
           style="width:100%;"
         >
            <el-form-item label="链路ID" prop="id">
               <el-input v-model="linkInfo.id" autocomplete="off" />
             </el-form-item>
             <el-form-item label="链路带宽" prop="bandWidth">
               <el-input v-model="linkInfo.bandWidth" autocomplete="off" />
             </el-form-item>
             <el-form-item label="(1)端结点ID" prop="end1node">
               <el-cascader v-model="linkInfo.end1node" :options="endNodeOptions" :props="{emitPath:false}"
                :show-all-levels="false" />
             </el-form-item>
              <el-form-item label="(1)端结点PORT" prop="end1port">
              <el-cascader v-model="linkInfo.end1port" :options="end1PortOptions" :props="{emitPath:false}"
              :show-all-levels="false" />
             </el-form-item>
              <el-form-item label="(2)端结点ID" prop="end2node">
               <el-cascader v-model="linkInfo.end2node" :options="endNodeOptions" :props="{emitPath:false}"
               :show-all-levels="false" />
             </el-form-item>
              <el-form-item label="(2)端结点PORT" prop="end2port">
              <el-cascader v-model="linkInfo.end2port" :options="end2PortOptions" :props="{emitPath:false}"
              :show-all-levels="false"/>
             </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="submitForm(ruleFormRef)"
               >Submit</el-button
             >
             <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
           </el-form-item>
         </el-form>
    </div>
</template>

<script setup lang="ts">
// 该组件用于网络元素编辑
import { reactive, ref,computed, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import {useStore} from "@/store/index"
import { json } from 'stream/consumers';

const store =useStore();

// 链路表单
let linkInfo =computed(()=>{
  return store.getters.getElementList('links')
})


const ruleFormRef = ref<FormInstance>()

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
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
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
// 从store中获取主机和switch的id
let network =computed(()=>{
    return store.getters.getNetwork('new');
})

// 表单项
let endNodeOptions =reactive([
  {
    value:'host',
    label:'host',
    children:[]
  },
  {
    value:'switch',
    label:'switch',
    children:[]
  }
])
// 端口的值需要根据结点id来确定
let end1PortOptions =reactive([{}])
let end2PortOptions =reactive([{}])

const getPortbyID =(id:string,endPortOptions:any)=>{
  if(id=='') {
    endPortOptions.length =0; //清空数组
    endPortOptions.push({})
  }
  // 不为空就寻找
  network.value.hosts.forEach((item:any)=>{
    if (item.id ==id){
      endPortOptions.length =0; //清空数组
      endPortOptions.push({
        value:item.port,
        label:item.port,
        leaf:true
      })
    }
    return;
  })
  network.value.switches.forEach((item:any)=>{
    if (item.id ==id){
      endPortOptions.length =0; //清空数组
      for (let i=0;i<4;i++){
         endPortOptions.push({
            value:item[`port${i}`],
            label:item[`port${i}`],
            leaf:true
         })
      }
    }
    return;
  })
}

const updateOptionsNode =()=>{
  // 先清空
  endNodeOptions[0].children =[]
  endNodeOptions[1].children =[]
  // 再赋值
  network.value.hosts.forEach((item:any) => {
    (endNodeOptions[0].children as Array<any>).push({
      value:item.id,
      label:item.id,
    });
  });
  network.value.switches.forEach((item:any) => {
    (endNodeOptions[1].children as Array<any>).push({
      value:item.id,
      label:item.id,
    });
  });
}
// 获取链路中最后一个元素
const linkLastItem =computed(()=>{
  return store.getters.getElementList('links');
})
updateOptionsNode();
getPortbyID(linkLastItem.value.end1node,end1PortOptions)
getPortbyID(linkLastItem.value.end2node,end2PortOptions)

watch(()=>store.getters.getNetwork('new'),()=>{
  updateOptionsNode();
  getPortbyID(linkLastItem.value.end1node,end1PortOptions)
  getPortbyID(linkLastItem.value.end2node,end2PortOptions)
  },{deep:true}
)

</script>

<style scoped>

</style>