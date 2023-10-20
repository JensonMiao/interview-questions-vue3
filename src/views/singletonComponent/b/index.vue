<template>
  <div class="page">
    <el-button @click="$router.push('/singletonComponent/a')">跳转到a页面</el-button>
    <div>
      <Singleton page-name="b"/>
    </div>
  </div>
</template>
<script lang="ts" setup name="">

import Singleton from '@/views/singletonComponent/components/Singleton.vue';
</script>
<style lang="scss" scoped>

.page{
  margin:100px 200px;
}
</style>
