<template>
  <Dialog v-bind="$attrs">
    <div class="my_dialog">
      <div class="title">弹窗标题</div>
      <div class="top" ref="topRef">
        <div class="filter-box">
          <template v-for="(item, index) in list" :key="index">

            <div class="filter-item" v-if="showMoreDom||item.show===undefined?true:item.show" ref="filterDomList">
              <span :style="{width:item.width+'px'}">
              {{ item.text || 'filter-item' }}
              </span>
            </div>
          </template>
        </div>
        <div>
          <el-button size="small"> 查询</el-button>
        </div>
        <span v-if="isBoolean(showMoreDom)" @click="handleClick(!showMoreDom)" style="cursor: pointer">
          {{ showMoreDom ? '收起' : '展开' }}
          <el-icon>
            <ArrowUp v-if="showMoreDom" />
            <ArrowDown v-else />
          </el-icon>
        </span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="bottom">底部组件（应该永远处于弹窗底部）</div>
    </div>
  </Dialog>
</template>
<script lang="ts" setup name="MyDialog">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { PropType, onMounted, ref, nextTick, watch } from 'vue'
import { isBoolean } from 'lodash-es';
import Dialog from '../../src/components/Dialog.vue'
import { FilterData } from '../../src/views/dialogStyle/types'


const props = defineProps({
  filterList: {
    type: Array as PropType<FilterData[]>,
    default: () => [],
  },
})
const show = ref(false)
const topRef = ref()
const list = ref<(FilterData & { show?: boolean })[]>([...props.filterList])
const filterDomList = ref()

const showMoreDom = ref<boolean>()

function handleClick(flag: boolean) {
  showMoreDom.value = flag
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      let firstTop: number
      filterDomList.value?.forEach((ele: any, index: number) => {
        const { top } = ele.getBoundingClientRect()
        if (!firstTop) {
          firstTop = top
        }
        if (firstTop < top) {
          showMoreDom.value = false
          list.value[index].show = false
        }
      })
    })
  })
})
</script>
<style lang="scss" scoped>
.my_dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.title {
  padding: 10px;
  font-size: 20px;
  text-align: center;
}

.filter-box {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-right: 10px;

  .filter-item {
    min-width: calc(100% / 3);
    padding: 0 5px;
    margin-bottom: 10px;

    span {
      background-color: #f4f4f5;
      display: block;
      width: 100%;
    }
  }
}

.top {
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 10px 10px 0px 10px;
  position: relative;

  .el-button {
    margin-right: 10px;
  }
}

.content {
  margin-bottom: 10px;
  margin-top: 10px;
  flex: 1;
}

.bottom {
  background: rgba(0, 0, 0, 0.2);
}
</style>
