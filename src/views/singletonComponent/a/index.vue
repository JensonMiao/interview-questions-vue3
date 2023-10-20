<template>
  <div class="page">
    <el-button @click="$router.push('/singletonComponent/b')">跳转到b页面</el-button>
    <div>
      <Singleton page-name="a"/>
    </div>
  </div>
</template>
<script lang="ts" setup name="SingletonComponentA">
import Singleton from '@/views/singletonComponent/components/Singleton.vue';

</script>
<style lang="scss" scoped>
.page{
  margin:100px 200px;
}
</style>
