<template>
  <Dialog v-bind="$attrs">
    <div class="title">
      弹窗标题
    </div>
    <div class="top">
      <div v-for="(item,index) in filterList" :key="index" class="filter-item">
        {{ item.text || 'filter-item' }}
      </div>
      <div>
        <el-button> 查询</el-button>
      </div>
      <span>
        展开
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>

    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="bottom ">
      底部组件（应该永远处于弹窗底部）
    </div>
  </Dialog>
</template>
<script lang="ts" setup name="MyDialog">
import { ArrowDown } from '@element-plus/icons-vue'
import { PropType } from 'vue';
import Dialog from '@/components/Dialog.vue';
import { FilterData } from '@/views/dialogStyle/types';

defineProps({
  filterList: {
    type: Array as PropType<FilterData[]>,
    default: () => []
  }
})

</script>
<style lang="scss" scoped>
.title {
  padding: 10px;
  font-size: 20px;
  text-align: center;
}

.top {
  background: rgba(0, 0, 0, .2);
  padding: 10px;
}

.filter-item{
  background-color: #f4f4f5;
  padding: 0 5px;
}

.content {
  margin-bottom: 10px;
  margin-top: 10px;
}

.bottom {
  background: rgba(0, 0, 0, .2);
}
</style>
