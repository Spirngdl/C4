<template>
    <div class="dashboard-layout">
        <section class="header">
            <div class="item">
                <img src="../../assets/icons/setting.svg">
                <div class="item-content">
                     <h4>系统运行时间：</h4>
                    <span>{{date}}</span>
                </div>
            </div>
             <div class="item">
                <img src="../../assets/icons/switch.svg">
                <div class="item-content">
                     <h4>已上线交换机：</h4>
                    <span>{{"测试数据"}}</span>
                </div>
            </div>
             <div class="item">
                <img src="../../assets/icons/router.svg">
                <div class="item-content">
                     <h4>已上线路由器：</h4>
                    <span>{{"测试数据"}}</span>
                </div>
            </div>
             <div class="item">
                <img src="../../assets/icons/pc.svg">
                <div class="item-content">
                     <h4>已上线主机：</h4>
                    <span>{{"测试数据"}}</span>
                </div>
            </div>
        </section>
        <section class="content">
            <section class="log">
                <div class="scroll-header">
                    <span>序号</span>
                    <span>重要事件</span>
                    <span>发生时间</span>
                    <span>标签</span>
                </div>
                 <el-scrollbar height="650px" ref="scrollList" @scroll="scroll">
                      <p v-for="(item,index) in things" :key="item.time" class="scrollbar-demo-item" >
                        <span>{{"#"+index}}</span>
                        <span>{{item.descrip}}</span>
                        <span>{{item.time}}</span>
                        <el-tag class="ml-2" type="success">{{item.remark}}</el-tag>
                      </p>
                </el-scrollbar>
            </section>
            <section class="state">
                <div class="state-header">设备上线状态</div>
                <div class="item">
                    <div><span>ONOS CONTROLLER</span><el-progress :text-inside="true" :stroke-width="26" :percentage="100" style="width:500px;"/></div>
                    <div><span>ROUTES</span><el-progress :text-inside="true" :stroke-width="26" :percentage="100" style="width:500px;" /></div>
                    <div><span>SWITCHES</span><el-progress :text-inside="true" :stroke-width="26" :percentage="100" style="width:500px;" /></div>
                    <div><span>HOSTS</span><el-progress :text-inside="true" :stroke-width="26" :percentage="100" style="width:500px;"  /></div>
                </div>
            </section>
        </section>
        
    </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref} from "vue"
import { ElScrollbar } from 'element-plus'
import things from "@/object/data/dashboardScrollList"

let date =ref('');
const value =ref(0)
date.value =getDistanceSpecifiedTime('2022/06/20 02:02:00')
function getDistanceSpecifiedTime(dateTime:any) {
    // 指定日期和时间
    let EndTime = new Date(dateTime);
    // 当前系统时间
    let NowTime = new Date();
    let t = NowTime.getTime() -EndTime.getTime() 
    let d = Math.floor(t / 1000 / 60 / 60 / 24);
    let h = Math.floor(t / 1000 / 60 / 60 % 24);
    let m = Math.floor(t / 1000 / 60 % 60);
    let s = Math.floor(t / 1000 % 60);
    let html = d + " 天 " + h + " 时 " + m + " 分 " + s + " 秒";
    return html;
}
const scroll = ({ scrollTop }:any) => {
  value.value = scrollTop
}
// 实现自动滚动
// 获取列表元素
let scrollList =ref<InstanceType<typeof ElScrollbar>>()

// 声明定时器
const state:any =reactive({
    AutoScroll:null,
    DisplayDate:null
})

onMounted(()=>{ 
    state.AutoScroll =setInterval(()=>{
        if (value.value>=600) value.value=0;
        value.value +=1;
        scrollList.value!.setScrollTop(value.value)
    },25)
    // 设置一个定时器，不断获取数据
    state.DisplayDate = setInterval(()=>{
        date.value =getDistanceSpecifiedTime('2022/06/20 02:02:00')
    },1000)
})

// 组件销毁时移除定时器
onUnmounted(()=>{
    clearInterval(state.AutoScroll)
    clearInterval(state.DisplayDate)
})

</script>

<style scoped>
.header{
    margin: 20px 40px 0 20px;
    padding: 10px 20px 10px 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
}
.header>.item {
    display: flex;
}
img{
    width: 70px;
    height: 70px;
}
.item>.item-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0 10px 20px;
}

.content {
    display: flex;
    justify-content: space-between;
    margin: 20px 40px 0 20px;
}

.scroll-header{
    display:flex;
    justify-content: space-between;
    padding: 0 10px 0 10px;
    font-size: large;
    font-weight: 600;
}
.content>.log,.state{
    width:50%;
    border-radius: 10px;
    border: 1px solid rgb(202, 191, 191);
    box-shadow: 1px 5px 1px rgb(202, 191, 191);
}
.state{
    margin-left: 40px;
}
.state>.state-header{
    display: flex;
    justify-content: center;
    margin:50px 0 20px 0;
    font-size: large;
    font-weight: 600;
}
.state>.item>div>span{
    width:200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.state>.item>div{
    display: flex;
    width:80%;
    margin: 40px 0 30px 0;
}
.state>.item{
    width: 100%;
   display: flex;
   flex-direction: column;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
}

.scrollbar-demo-item>span:nth-of-type(2){
    width:35%
}
</style>