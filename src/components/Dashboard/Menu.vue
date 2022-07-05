<template>
    <div class="menu-layout">
        <el-menu 
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            background-color="#ffffff"
            router
            style="height: 100%;"
        >
            <MenuItem :menuList="menuList"></MenuItem>
        </el-menu>

    </div>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue"

import { computed, reactive } from 'vue';
import { useRoute } from "vue-router"
// 菜单当前选中项，根据当前路由项来确定
const route =useRoute();
let activeIndex =computed(()=>{
    const {path} =route;
    return path;
})
// 菜单栏不要写死，根据数据渲染（后期便于修改）
let menuList =reactive([
    {
        // 首页
        path:"/dashboard",
        meta:{
            title:"首页",
            icon:"HomeFilled"
        },
        children:[]
    },
    {
        path:"/netmanage",
        meta:{
            title:"网络管理",
            icon:"MostlyCloudy"
        },
        children:[
            {
                path:"/netlist",
                meta:{
                    title:"网络列表",
                    icon:"Lightning"
                },
                children:[]
            },
            {
                path:"/netcreate",
                meta:{
                    title:"网络创建",
                    icon:"Plus"
                },
                children:[]
            }
        ]
    },
    {
        path:"/devicemanage",
        meta:{
            title:"设备管理",
            icon:"ShoppingBag"
        },
        children:[
            {
                path:"/hostlist",
                meta:{
                    title:"主机列表",
                    icon:"Platform"
                },
                children:[]
            },
            {
                path:"/switchlist",
                meta:{
                    title:"交换机列表",
                    icon:"Postcard"
                },
                children:[]
            },
            {
                path:"/linklist",
                meta:{
                    title:"链路列表",
                    icon:"SetUp"
                },
                children:[]
            }
        ]
    },
    {
        path:"/flowManage",
        meta:{
            title:"流表管理",
            icon:"Box",
        },
        children:[
            {
                path:"/flowTableDump",
                meta:{
                    title:"流表下发",
                    icon:"Download"
                },
                children:[]
            },
            {
                path:"/flowTableList",
                meta:{
                    title:"流表列表",
                    icon:"Files"
                },
                children:[]
            }
        ]
    },
    {
        path:"/datamonitor",
        meta:{
            title:"流量监控",
            icon:"TrendCharts"
        },
        children:[
            {
                path:"/delayinfo",
                meta:{
                    title:"时延信息",
                    icon:"Timer"
                },
                children:[]
            }
        ]
    }
])
</script>

<style scoped>
.menu-layout {
    height: 100%;
}
</style>