<template>
  <button ref="_ref" :class="['ga-button', 'ga-button--' + type]">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义组件类型
type ButtonTypes = 'default' | 'primary' | 'success' | 'danger'

defineProps<{
  type: ButtonTypes
}>()

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref,
})
</script>
<style lang="scss" scoped></style>
