<template>
  <MyDialog v-model="show" :filterList="filterList">
    <div class="content">
      撑满的内容
    </div>
  </MyDialog>
</template>
<script setup lang="ts" name="DialogStylePage">
import { ref } from 'vue'
import MyDialog from '@/views/dialogStyle/components/MyDialog.vue';

const show = ref(true)

const filterList = [
  {
    text: 'filter-1',
    width: 200
  },
  {
    text: 'filter-2',
  },
  {
    text: 'filter-3',
  },
  {
    text: 'filter-4',
  },
  {
    text: 'filter-5',
  },
  {
    text: 'filter-6',
  },
  {
    text: 'filter-7',
  },
  {
    text: 'filter-8',
  },
]

</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .2);
}
</style>
