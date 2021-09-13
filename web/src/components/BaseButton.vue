<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface Props {
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: ''
})
const { to } = toRefs(props)

const tagName = computed(() => to.value ? 'router-link' : 'button')
</script>

<template>
  <component
    :is="tagName"
    :to="to"
    class="flex justify-center items-center px-4 py-2 text-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 text-white rounded-md cursor-pointer"
  >
    <slot />
  </component>
</template>
