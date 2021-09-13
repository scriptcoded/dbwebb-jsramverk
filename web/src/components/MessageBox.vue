<script setup lang="ts">
import { computed } from 'vue'

const colors = {
  plain: 'bg-white border-black color-black',
  red: 'bg-red-100 border-red-500 text-red-600',
  green: 'bg-green-100 border-green-500 text-green-600',
  indigo: 'bg-indigo-100 border-indigo-500 text-indigo-600'
}

const props = withDefaults(defineProps<{
  color: keyof typeof colors
}>(), {
  color: undefined
})

const colorClasses = computed(() => {
  return colors[props.color] ?? colors.plain
})

</script>

<template>
  <div
    :class="colorClasses"
    class="border-2 px-4 py-3 text-lg rounded-md"
  >
    <slot />
  </div>
</template>
