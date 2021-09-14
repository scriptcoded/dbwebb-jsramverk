<script setup lang="ts">

withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  name?: string
  label?: string
  readonly?: boolean
  autofocus?: boolean
}>(), {
  modelValue: '',
  placeholder: undefined,
  type: undefined,
  name: undefined,
  label: undefined,
  readonly: false,
  autofocus: false
})

const emit = defineEmits(['update:modelValue'])

const emitInput = (e: Event) => emit('update:modelValue', (e.target as any)?.value ?? '')

</script>

<template>
  <div class="flex relative">
    <div
      v-if="label"
      class="absolute top-[-0.55rem] left-3 bg-white px-1 pointer-events-none text-sm"
      :class="{
        'text-black': !readonly,
        'text-gray-600': readonly
      }"
    >
      {{ label }}
    </div>

    <input
      class="flex-1 outline-none border-2 rounded-md px-3 py-2"
      :class="{
        'border-black focus:ring-1 ring-indigo-500 focus:border-indigo-500': !readonly,
        'border-gray-600': readonly
      }"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :readonly="readonly"
      :autofocus="autofocus"
      @input="emitInput"
    >
  </div>
</template>
