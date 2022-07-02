<template>
    <div class="tabs-layout">
        <el-tabs
           v-model="activeTab"
           type="card"
           closable
           class="demo-tabs"
           @tab-click="clickTab"
           @tab-remove="removeTab"
         >
           <el-tab-pane
             v-for="item in tabsList"
             :key="item.path"
             :label="item.title"
             :name="item.path"
           >
           </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import {onMounted,reactive,ref, watch} from "vue"
import {useRoute,useRouter} from "vue-router"
const router =useRouter();
const route =useRoute();
interface Tab {
    path:string,
    title:string
}
let tabsList=ref([] as Array<Tab>);

// 点击标签跳转
let clickTab =(tab:any)=>{
    const {props} =tab;
    router.push({path:props.name})
};
// 删除标签
let removeTab =(targetName:any)=>{
    // 首页不能删除
    if (targetName =='/dashboard') return;
    const tabs =tabsList;
    let activeName =activeTab.value;
    // 删除的就是当前tab
    if (activeName === targetName) {
        tabs.value.forEach((tab: any, index: number) => {
            if (tab.path === targetName) {
                // nextTab就是当前删除标签的上一个或下一个（下一个没有就上一个）
                const nextTab = tabs.value[index + 1] || tabs.value[index - 1]
                // 将nextTab作为当前激活的数据
                if (nextTab) {
                    activeName = nextTab.path
                }
            }
        })
    }
    // 删除数据不是当前选中数据时（激活标签还是原标签）
    activeTab.value = activeName;
    // 重新设置选项卡数据（将被删除的标签剔除）
    tabsList.value = tabs.value.filter((tab: any) => tab.path !== targetName)
    // 跳转路由
    router.push({ path: activeName })
}
// 添加标签
const addTab =()=>{
    // 获取当前路由信息
    const { path, meta } = route;
    //通过vuex设置
    const tab = {
        path: path,
        title: meta.title as string
    }
    console.log(route)
    // 跟路由不能被添加，重复路由不能被添加
    if (path=='/') return
    let isExit =0;
    tabsList.value.forEach(oldTab=>{
        if (path==oldTab.path) isExit=1;
    })
    if (isExit==0)  tabsList.value.push(tab);
}
let activeTab =ref('');
watch(()=>route.path,()=>{
    activeTab.value =route.path;
    addTab()
})

// 防止刷新之后tabsList丢失
const beforeRefresh = () => {
    // 检测到浏览器刷新之前，将tabsList数据储存到sessionStorage中
    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("tabsView", JSON.stringify(tabsList.value))
    })
    let tabSession = sessionStorage.getItem("tabsView");
    if (tabSession) {
        let oldTabs = JSON.parse(tabSession);
        if (oldTabs.length > 0) {
           tabsList.value = oldTabs
        }
    }
}
onMounted(()=>{
    // 解决刷新选项卡丢失问题
    beforeRefresh();
    activeTab.value =route.path;
    addTab()
})

</script>

<style scoped>
.tabs-layout{
    box-sizing: border-box;
    /* border: 1px dashed #111; */
}
</style>