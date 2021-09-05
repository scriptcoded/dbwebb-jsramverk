<script setup lang="ts">
import { ref } from 'vue'
import RealTimeEditor from '../components/realTimeEditor/TextEditor.vue'

const content = ref('')

const onSave = () => {
  console.log(content.value)
}

</script>

<template>
  <RealTimeEditor
    v-model:content="content"
    @save="onSave"
  />
</template>
