<script setup lang="ts">
import { useEditor } from '@tiptap/vue-3'
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

const emit = defineEmits(['update:content', 'save'])

const editor = useEditor({
  content: '<h1>Type something!</h1><p>(<em>it\'s free</em>)</p><p>Create your next master piece</p><pre><code>// Or ditch your IDE and write some code</code></pre><p>The possibilities are:</p><ul><li><p>Endless...</p></li><li><p>Endless...</p></li><li><p>...</p></li></ul>',
  extensions: [
    StarterKit
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg m-5 prose-indigo focus:outline-none'
    }
  },
  onUpdate ({ editor }) {
    emit('update:content', editor.getHTML())
  },
  onCreate ({ editor }) {
    emit('update:content', editor.getHTML())
  }
})

watch(content, (value) => {
  if (!editor.value) { return }

  const isSame = editor.value.getHTML() === value

  if (isSame) { return }

  editor.value.commands.setContent(value, false)
})

</script>

<template>
  <div
    v-if="editor"
    class="border-black border-2 rounded-md overflow-hidden"
  >
    <TextEditorNavbar
      :editor="editor"
      @save="emit('save')"
    />
    <TextEditorContent :editor="editor" />
  </div>
</template>
