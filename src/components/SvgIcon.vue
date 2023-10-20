<template>
  <svg aria-hidden="true" :class="svgClass" v-bind="$attrs" :style="size?{width:size+'px',height:size+'px'}:{}">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup name="SvgIcon" lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  size:{
    type:String,
    default:''
  }
})
const iconName = computed(() => `#${props.prefix}-${props.name}`)
const svgClass = computed(() => {
  if (props.name) return `svg-icon ${props.prefix}-${props.name}`
  return 'svg-icon'
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
