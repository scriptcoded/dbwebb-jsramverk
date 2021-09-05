<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon?: string
  text?: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  text: undefined,
  active: false
})

const classes = computed(() => props.active
  ? 'text-white bg-indigo-500 hover:bg-black hover:text-white'
  : 'text-black hover:bg-black hover:text-white')

</script>

<template>
  <button
    class="h-8 px-2 mr-1 flex justify-center items-center rounded-md"
    :class="classes"
  >
    <div
      v-if="icon"
      class="w-4 h-4 flex justify-center items-center"
      :class="{
        'mr-1': text
      }"
    >
      <i :class="icon" />
    </div>
    {{ text }}
  </button>
</template>
