<script setup lang="ts">
import { computed, toRefs } from 'vue'

const sizes = {
  normal: 'h-11 px-4 text-lg',
  small: 'h-8 px-3 text-base',
  tiny: 'h-6 px-2 text-xs'
}

const colors = {
  indigo: 'border-indigo-500 bg-indigo-500 text-white hover:bg-indigo-600 hover:border-indigo-600 active:bg-indigo-400 active:border-indigo-400',
  red: 'border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600 active:bg-red-400 active:border-red-400',
  'red-outline': 'border-red-500 bg-white text-red-500 hover:bg-red-600 hover:border-red-600 active:bg-red-400 active:border-red-400 hover:text-white active:text-white'
}

interface Props {
  to?: string
  type?: string
  size?: keyof typeof sizes
  color?: keyof typeof colors
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  type: 'button',
  size: undefined,
  color: undefined
})
const { to } = toRefs(props)

const tagName = computed(() => to.value ? 'router-link' : 'button')

const sizeClasses = computed(() => {
  return sizes[props.size] ?? sizes.normal
})

const colorClasses = computed(() => {
  return colors[props.color] ?? colors.indigo
})
</script>

<template>
  <component
    :is="tagName"
    :to="to"
    :type="type"
    class="flex justify-center items-center rounded-md cursor-pointer border-2"
    :class="[sizeClasses, colorClasses]"
  >
    <slot />
  </component>
</template>
