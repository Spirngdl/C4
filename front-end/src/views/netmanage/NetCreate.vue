<template>
    <div class="netcreate-layout">
        <section class="header">

        </section>
        <section class="content">
            <NetCreateForm></NetCreateForm>
        </section>
    </div>
</template>

<script setup lang="ts">
import NetCreateForm from '@/components/NetManage/NetCreateForm.vue';
</script>

<style scoped>
.netcreate-layout{
    width: 100%;
    min-height: calc(100% - 40px);
}
.netcreate-layout>.content{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>