<script setup lang="ts">

defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const emitInput = (e: Event) => emit('update:modelValue', (e.target as any)?.value ?? '')

</script>

<template>
  <input
    class="outline-none focus:ring-1 ring-indigo-500 focus:border-indigo-500 border-2 border-black rounded-md px-3 py-2"
    :value="modelValue"
    @input="emitInput"
  >
</template>
