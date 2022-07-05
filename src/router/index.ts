import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router"

const routes:Array<RouteRecordRaw> =[
    {
        path:"/",
        redirect:"/login"
    },
    {
        path:"/login",
        component:()=>import("@/views/Login.vue"),
        name:"login"
    },
    {
        path:"/dashboard",
        component:()=>import("@/views/dashboard/Dashboard.vue"),
        name:"dashboard",
        meta:{
            title:"首页"
        }
    },
    // 网络可视化路由
    {
        path:"/network:id",
        component:()=>import("@/views/NetWork.vue"),
        name:"network",
        meta:{
            title:"网络拓扑"
        }
    },
    {
        path:"/netlist",
        component:()=>import("@/views/netmanage/NetList.vue"),
        name:"netlist",
        meta:{
            title:"网络列表"
        }
    },
    {
        path:"/netcreate",
        component:()=>import("@/views/netmanage/NetCreate.vue"),
        name:"netcreate",
        meta:{
            title:"网络创建"
        }
    },
    // 设备管理路由
    {
        path:"/switchlist",
        component:()=>import("@/views/devicemanage/SwitchList.vue"),
        name:"switchlist",
        meta:{
            title:"交换机列表"
        }
    },
    {
        path:"/hostlist",
        component:()=>import("@/views/devicemanage/HostList.vue"),
        name:"hostlist",
        meta:{
            title:"主机列表"
        }
    },
    {
        path:"/linklist",
        component:()=>import("@/views/devicemanage/LinkList.vue"),
        name:"linklist",
        meta:{
            title:"链路列表"
        }
    },
    // 流表管理
    {
        path:"/flowTableDump",
        component:()=>import("@/views/flowManage/FlowTableDump.vue"),
        name:"流表下发",
        meta:{
            title:'流表下发'
        }
    },
    {
        path:"/flowTableList",
        component:()=>import("@/views/flowManage/FlowTableList.vue"),
        name:"流表列表",
        meta:{
            title:'流表列表'
        }
    },
    // 数据统计信息
    {
        path:"/delayinfo",
        component:()=>import("@/views/datamonitor/DelayInfo.vue"),
        name:"delayinfo",
        meta:{
            title:"时延信息"
        }
    }
]


const router =createRouter({
    history:createWebHistory(),
    routes
})

export default router;