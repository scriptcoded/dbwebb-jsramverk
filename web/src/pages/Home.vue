<script setup lang="ts">
import { ref } from 'vue'
import RealTimeEditor from '../components/realTimeEditor/TextEditor.vue'
import DocumentList from '../components/DocumentList.vue'
import LoginPrompt from '../components/LoginPrompt.vue'
import { useAuth } from '../composables/auth'

const content = ref('')

const onSave = () => {
  console.log(content.value)
}

const { user } = useAuth()

</script>

<template>
  <LoginPrompt v-if="!user" />

  <div
    v-else
    class="flex flex-col lg:flex-row pt-8 px-6 lg:space-x-4"
  >
    <div class="pb-4 lg:pb-0 lg:flex-1">
      <DocumentList
        active-document="afw"
      />
    </div>

    <div class="lg:flex-[3] lg:max-w-5xl">
      <RealTimeEditor
        v-model:content="content"
        @save="onSave"
      />
    </div>

    <div class="hidden xl:block lg:flex-1" />
  </div>
</template>
