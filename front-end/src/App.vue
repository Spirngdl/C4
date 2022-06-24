<script setup lang="ts">
import Menu from "@/components/Dashboard/Menu.vue"
import Header from "@/components/Dashboard/Header.vue"
</script>

<template>
   <div class="common-layout">
    <el-container>
      <el-header height="60px">
        <Header></Header>
      </el-header>
      <el-container class="main-content">
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.common-layout {
  height: 100vh;
}
.main-content {
  height: calc(100vh - 60px);
}
</style>
