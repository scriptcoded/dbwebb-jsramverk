<script setup lang="ts">

withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  name?: string
  label?: string
}>(), {
  modelValue: '',
  placeholder: undefined,
  name: undefined,
  label: undefined
})

const emit = defineEmits(['update:modelValue'])

const emitInput = (e: Event) => emit('update:modelValue', (e.target as any)?.value ?? '')

</script>

<template>
  <div class="flex relative">
    <div
      v-if="label"
      class="absolute top-[-0.55rem] left-3 bg-white px-1 pointer-events-none text-sm text-black"
    >
      {{ label }}
    </div>

    <select
      class="flex-1 outline-none border-2 rounded-md px-3 py-2 border-black focus:ring-1 ring-indigo-500 focus:border-indigo-500"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      @input="emitInput"
    >
      <slot />
    </select>
  </div>
</template>
