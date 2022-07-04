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
                 <el-scrollbar height="400px" ref="scrollList" @scroll="scroll">
                      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                        {{ item }}
                      </p>
                </el-scrollbar>
            </section>
            <section class="state"></section>
        </section>
        
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
import { ElScrollbar } from 'element-plus'

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
onMounted(()=>{ 
    setInterval(()=>{
        if (value.value>=400) value.value=0;
        value.value +=1;
        scrollList.value!.setScrollTop(value.value)
    },25)
    // 设置一个定时器，不断获取数据
    setInterval(()=>{
        date.value =getDistanceSpecifiedTime('2022/06/20 02:02:00')
    },1000)
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
.content>.log{
    width:50%;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>