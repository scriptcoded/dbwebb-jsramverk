<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import RealTimeEditor from '../components/realTimeEditor/TextEditor.vue'
import DocumentList from '../components/DocumentList.vue'
import LoginPrompt from '../components/LoginPrompt.vue'
import { useAuth } from '../composables/auth'
import { useDocument, useDocuments } from '../composables/documents'
import { useUsers } from '../composables/users'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseSelect from '../components/BaseSelect.vue'

import { io, Socket } from 'socket.io-client'
import { config } from '../config'

const activeDocument = ref<string | null>(null)

const { document, destroy, addDocumentCollaborator, removeDocumentCollaborator } = useDocument(activeDocument)
const { updateUserDocumentLocal } = useDocuments()

const { getUsers, users } = useUsers()

onMounted(getUsers)

const characterCount = ref(0)
const wordCount = ref(0)

let socket: Socket

const connectSocket = () => {
  socket = io(config.apiURL, {
    reconnection: true,
    reconnectionDelay: 500,
    jsonp: false,
    reconnectionAttempts: Infinity,
    transports: ['websocket']
  })

  socket.on('connect', () => {
    console.log(socket.id)
  })

  socket.on('connect_error', (e) => {
    console.log('Socket.io connection error:', e)
  })

  socket.on('updatedDoc', (doc) => {
    if (!document.value) { return }

    updateUserDocumentLocal(doc._id, {
      content: doc.content,
      name: doc.name
    })
  })
}
onMounted(connectSocket)

const broadcastDocument = () => {
  if (!document.value) { return }
  socket.emit('updateDoc', document.value)

  updateUserDocumentLocal(document.value._id, {
    content: document.value.content,
    name: document.value.name
  })
}

watch(document, (doc, oldDoc) => {
  if (doc && doc?._id === oldDoc?._id) {
    console.log('Broadcasting', doc)
    broadcastDocument()
  }
}, {
  deep: true
})

const activateDocument = (id: string) => {
  activeDocument.value = id

  socket.emit('joinDoc', id)
}

const destroyDocument = async () => {
  const ok = window.confirm('Are you sure you want to delete the document?')

  if (!ok) {
    return
  }

  await destroy()
}

const { user } = useAuth()

const addingCollaborator = ref('')

watch(addingCollaborator, async (userID) => {
  if (addingCollaborator.value) {
    await nextTick()

    addingCollaborator.value = ''

    if (!document.value) {
      return
    }

    addDocumentCollaborator(userID)
  }
})

const remainingUsers = computed(() => {
  return users.value
    .filter(u => !document.value?.collaborators.map(c => c._id).includes(u._id))
    .filter(u => u._id !== user.value?._id)
})

const isOwner = computed(() => {
  if (!document.value || !user.value) {
    return false
  }

  return !document.value.collaborators.some(c => c._id === user.value?._id)
})

</script>

<template>
  <LoginPrompt v-if="!user" />

  <div
    v-else
    class="flex flex-col lg:flex-row pt-8 px-6 lg:space-x-4"
  >
    <div class="pb-4 lg:pb-0 lg:flex-1">
      <DocumentList
        :active-document="activeDocument"
        @update:active-document="activateDocument"
      />
    </div>

    <div class="lg:flex-[3] lg:max-w-5xl">
      <RealTimeEditor
        v-if="document"
        v-model:content="document.content"
        v-model:characterCount="characterCount"
        v-model:wordCount="wordCount"
      />
    </div>

    <div class="flex flex-col space-y-4 xl:block lg:flex-1">
      <h3 class="text-2xl pl-1">
        Info
      </h3>

      <template v-if="document">
        <ul class="space-y-1">
          <li
            v-for="collaborator in document.collaborators"
            :key="collaborator._id"
            class="flex justify-between"
          >
            {{ collaborator.username }}

            <BaseButton
              size="tiny"
              @click="removeDocumentCollaborator(collaborator._id)"
            >
              Remove
            </BaseButton>
          </li>
        </ul>

        <BaseSelect
          v-if="isOwner"
          v-model="addingCollaborator"
        >
          <option
            disabled
            value=""
          >
            Add collaborator
          </option>
          <option
            v-for="u in remainingUsers"
            :key="u._id"
            :value="u._id"
          >
            {{ u.username }}
          </option>
        </BaseSelect>

        <BaseInput
          v-model="document.name"
          label="Name"
        />

        <BaseInput
          :model-value="characterCount.toString()"
          label="Character count"
          readonly
        />

        <BaseInput
          :model-value="wordCount.toString()"
          label="Word count"
          readonly
        />

        <BaseButton
          class="w-full"
          color="red-outline"
          @click="destroyDocument"
        >
          Delete
        </BaseButton>
      </template>
    </div>
  </div>
</template>
