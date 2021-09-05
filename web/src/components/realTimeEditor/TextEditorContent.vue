<script setup lang="ts">
import { EditorContent, Editor } from '@tiptap/vue-3'

defineProps<{
  editor: Editor
}>()

</script>

<template>
  <EditorContent
    :editor="editor"
  />
</template>
