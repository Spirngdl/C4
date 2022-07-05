<template>
    <div class="hostlist-layout">
       <section class="header">
            <span>选择网络拓扑ID：</span>
            <el-cascader v-model="value" :options="options" style="margin-right: 20px;"/>
             <span>选择相应交换机ID：</span>
            <el-cascader v-model="Switch" :options="SwitchOptions"/>
        </section>
        <section class="content">
              <el-form
                label-position="left"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
              >
                <el-form-item label="ID  :">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="GroupID  :">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="Priority  :">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
                <el-form-item label="DeviceID  :">
                  <el-input v-model="formLabelAlign.type" />
                </el-form-item>
                <el-form-item label="Instructions  :" id="instructions">
                    <el-form-item label="Type  :">
                      <el-input v-model="formLabelAlign.type" />
                    </el-form-item>
                    <el-form-item label="SubType  :">
                        <el-input v-model="formLabelAlign.type" />
                     </el-form-item>
                      <el-form-item label="ActionID  :">
                        <el-input v-model="formLabelAlign.type" />
                     </el-form-item>
                      <el-form-item label="ActionParmas:">
                        <el-input v-model="formLabelAlign.type" />
                     </el-form-item>
                </el-form-item>
                <el-form-item label="Matches  :" id="matches">
                    <el-form-item label="Type  :">
                      <el-input v-model="formLabelAlign.type" />
                    </el-form-item>
                    <el-form-item label="Field  :">
                        <el-input v-model="formLabelAlign.type" />
                     </el-form-item>
                      <el-form-item label="Match  :">
                        <el-input v-model="formLabelAlign.type" />
                     </el-form-item>
                      <el-form-item label="Value  :">
                        <el-input v-model="formLabelAlign.type" />
                     </el-form-item>
                </el-form-item>
               <el-form-item>
                     <el-button type="primary" size="default" @click="dumpFlow">下发流表</el-button>
                     <el-button type="primary" size="default" @click="dumpFlow">取消下发</el-button>
               </el-form-item>
              </el-form>
        </section>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive, watch} from "vue"

import {useStore} from "@/store/index"

const store =useStore();
const networks =store.getters['getNetworks'];

let options:Array<any> =reactive([])
let SwitchOptions:Array<any> =reactive([])
// 获取网络拓扑ID
const initOptions =()=>{
    const keys =Object.keys(networks);
    keys.forEach((key:string)=>{
        if (key!='new'){
            options.push({
                value:key,
                label:key
            })
        }
    })
}
initOptions()
const initSwitchOptions =(id:string)=>{
    // 先清空
    SwitchOptions.length =0;
    if (value.value=='') {
        console.log('kong??')
        return;    
    }
    // 获取switches的id添加进去
    networks[id].switches.forEach((item:any)=>{
        SwitchOptions.push({
            value:item.id,
            label:item.id
        })
    })
}
let value =ref('')
let Switch =ref('')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})

const dumpFlow =()=>{

}

watch([value],()=>{
    console.log('changed')
    // 更换SwitchOptions的值
    initSwitchOptions(value.value);
    // 更新展示的流表信息的值
   
})


</script>

<style>
#instructions>.el-form-item__content,
#matches>.el-form-item__content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#instructions>.el-form-item__content>.el-form-item,
#matches>.el-form-item__content>.el-form-item
{
    margin-bottom: 10px;
}

</style>

<style scoped>
.hostlist-layout{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.header{
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
    margin: 10px 20px 0 10px;
    padding-left: 30px;
}
.header>span{
    font-size: large;
    font-weight: 500;
}
.content {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    width: 40%;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
    margin: 30px 20px 0 10px;
}

</style>