<template>
  我是{{ pageName }}页面的Singleton组件
</template>
<script lang="ts" setup name="Singleton">

import { onMounted } from 'vue';

defineProps({
  pageName: {
    type: String,
    default: ''
  }
})
onMounted(() => {
  alert('Singleton组件初始化了')
})
</script>
