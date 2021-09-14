<script setup lang="ts">
import { nextTick, onMounted, toRefs, watch } from 'vue'
import { useDocuments } from '../composables/documents'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  activeDocument: string | null
}>()
const { activeDocument } = toRefs(props)

const emit = defineEmits(['update:activeDocument'])

const { documents, getUserDocuments, createUserDocument } = useDocuments()

const activateDocument = (id: string) => {
  emit('update:activeDocument', id)
}

const activateFallback = async () => {
  await nextTick()

  const active = documents.value.find(d => d._id === activeDocument.value)

  if (!active && documents.value.length) {
    activateDocument(documents.value[0]._id)
  }
}

watch(activeDocument, activateFallback)
watch(documents, activateFallback)

const createDocument = async () => {
  const document = await createUserDocument()
  activateDocument(document._id)
}
onMounted(async () => {
  await getUserDocuments()
  await activateFallback()
})

</script>

<template>
  <div class="space-y-2 pt-1">
    <div class="flex justify-between items-center">
      <h3 class="text-2xl pl-1">
        Documents
      </h3>

      <BaseButton
        size="small"
        @click="createDocument"
      >
        New
      </BaseButton>
    </div>

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
          @click="activateDocument(document._id)"
        >
          {{ document.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
