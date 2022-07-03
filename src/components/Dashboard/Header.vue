<template>
    <div class="header-layout">
        <div class="title">
            <img src="@/assets/logo.jpg" alt="团队logo">
            <span>基于P4的网络智能监控系统</span>
        </div>
        <div class="profile">
            <el-dropdown  split-button type="primary">
                {{username}}
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>修改资料</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
let username:string ="yzh2002"
</script>

<style scoped>
.header-layout {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title>img{
    width: 50px;
    height: 50px;
    object-fit: cover;
}
.title>span{
    font-family:'Courier New', Courier, monospace;
}
</style>