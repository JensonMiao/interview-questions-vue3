<template>
  <teleport to="#app" v-if="load&&modelValue">
    <div class="dialog">
      <div class="dialog__overlay">
      </div>
      <div class="main" :style="{height:height+'px',width:width+'px'}">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup name="Dialog">
import { nextTick, onMounted, ref } from 'vue'

defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  height: {
    type: Number,
    default: 500
  },
  width: {
    type: Number,
    default: 500
  }
})
const emits = defineEmits(['update:modelValue', 'close'])

const load = ref(false)

function close() {
  emits('update:modelValue', false)
  emits('close')
}

onMounted(() => {
  nextTick(() => {
    load.value = true
  })
})

</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  .dialog__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-color: var(--el-overlay-color-lighter);
  }

  .main {
    background: #fff;
    box-shadow: #2c2e40 0 0 10px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
