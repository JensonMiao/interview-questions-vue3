<template>
  <el-config-provider
    :button="config"
    :locale="locale"
  >
    <router-view />
  </el-config-provider>
</template>
<script setup name="App">

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { reactive, ref } from 'vue';

const config = reactive({
  autoInsertSpace: false,
})
const locale = ref(zhCn)
</script>
<style lang="scss">
</style>
