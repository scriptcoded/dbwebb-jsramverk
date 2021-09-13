<script setup lang="ts">
import { onMounted } from 'vue'
import { useDocuments } from '../composables/documents'

defineProps<{
  activeDocument: string
}>()

const { documents, getUserDocuments } = useDocuments()
onMounted(getUserDocuments)

</script>

<template>
  <ul class="space-y-1">
    <li
      v-for="document in documents"
      :key="document._id"
    >
      <a
        href="#"
        class="block text-lg py-3 px-3 rounded-md"
        :class="{
          ['bg-indigo-500 text-white']: document._id === activeDocument,
        }"
      >
        {{ document.name }}
      </a>
    </li>
  </ul>
</template>
