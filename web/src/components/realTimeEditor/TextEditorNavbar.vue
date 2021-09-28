<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'

import TextEditorNavbarButton from './TextEditorNavbarButton.vue'
import TextEditorNavbarDivider from './TextEditorNavbarDivider.vue'

defineProps<{
  editor: Editor
}>()

</script>

<template>
  <div class="border-black p-1 border-b-2 flex">
    <div class="flex-1 flex">
      <TextEditorNavbarButton
        icon="fas fa-bold"
        :active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-italic"
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-strikethrough"
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-code"
        :active="editor.isActive('code')"
        @click="editor.chain().focus().toggleCode().run()"
      />

      <TextEditorNavbarDivider />

      <TextEditorNavbarButton
        icon="fas fa-paragraph"
        :active="editor.isActive('paragraph')"
        @click="editor.chain().focus().setParagraph().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-h1"
        :active="editor.isActive('heading', { level: 1 })"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-h2"
        :active="editor.isActive('heading', { level: 2 })"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-h3"
        :active="editor.isActive('heading', { level: 3 })"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-list-ul"
        :active="editor.isActive('bulletLisst')"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-list-ol"
        :active="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-file-code"
        :active="editor.isActive('codeBlock')"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      />
    </div>

    <div class="flex">
      <TextEditorNavbarButton
        icon="fas fa-undo"
        @click="editor.chain().focus().undo().run()"
      />
      <TextEditorNavbarButton
        icon="fas fa-redo"
        @click="editor.chain().focus().redo().run()"
      />
    </div>
  </div>
</template>
