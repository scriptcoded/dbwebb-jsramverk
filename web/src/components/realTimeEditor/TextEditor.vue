<script setup lang="ts">
import { useEditor } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TextEditorNavbar from './TextEditorNavbar.vue'
import TextEditorContent from './TextEditorContent.vue'
import { toRefs, watch } from 'vue'

interface Props {
  content?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: ''
})
const { content } = toRefs(props)

const emit = defineEmits([
  'update:content',
  'update:characterCount',
  'update:wordCount',
  'download'
])

const emitEditorContent = (editor: Editor) => {
  emit('update:content', editor.getHTML())
}

const emitEditorMeta = (editor: Editor) => {
  const wordCount = editor.state.doc.textContent
    .trim()
    .split(/\s+/)
    .length

  emit('update:characterCount', editor.getCharacterCount())
  emit('update:wordCount', wordCount)
}

const editor = useEditor({
  content: content.value,
  extensions: [
    StarterKit
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg m-5 prose-indigo focus:outline-none'
    }
  },
  onUpdate ({ editor }) {
    emitEditorContent(editor)
    emitEditorMeta(editor)
  },
  onCreate ({ editor }) {
    emitEditorContent(editor)
    emitEditorMeta(editor)
  }
})

watch(content, (value) => {
  if (!editor.value) { return }

  const isSame = editor.value.getHTML() === value

  if (isSame) { return }

  editor.value.commands.setContent(value, false)
  emitEditorMeta(editor.value)
})

</script>

<template>
  <div
    v-if="editor"
    class="border-black border-2 rounded-md overflow-hidden"
  >
    <TextEditorNavbar
      :editor="editor"
      @download="emit('download')"
    />
    <TextEditorContent :editor="editor" />
  </div>
</template>
