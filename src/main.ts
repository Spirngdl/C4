import { createApp } from 'vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import { store, key } from './store/index'
import router from "@/router/index"

const app =createApp(App)
app.use(router).use(ElementPlus).use(store,key).mount('#app')


// 按需获取element-plus中的图标文件，以便于动态渲染菜单列表上的图标
import {HomeFilled,MostlyCloudy,Lightning,Plus,ShoppingBag,Platform,
   Postcard,SetUp,TrendCharts,Timer,Box,Download,Files} 
from "@element-plus/icons-vue"
// 将其注册为全局组件（这样便于动态渲染）
app.component('HomeFilled',HomeFilled)
   .component("MostlyCloudy",MostlyCloudy)
   .component("Lightning",Lightning)
   .component("Plus",Plus)
   .component("ShoppingBag",ShoppingBag)
   .component("Platform",Platform)
   .component("Postcard",Postcard)
   .component("SetUp",SetUp)
   .component("TrendCharts",TrendCharts)
   .component("Timer",Timer)
   .component("Files",Files)
   .component("Download",Download)
   .component("Box",Box)
