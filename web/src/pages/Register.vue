<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '../composables/auth'

import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import MessageBox from '../components/MessageBox.vue'

const username = ref('')
const password = ref('')

const loading = ref(false)
const error = ref<Error | null>(null)

const router = useRouter()

const { register } = useAuth()

const submitForm = async () => {
  loading.value = true
  error.value = null

  try {
    await register(username.value, password.value)

    router.push('/login')
  } catch (e) {
    error.value = e
  }
}

</script>

<template>
  <div class="flex flex-col items-center mt-24 mx-auto max-w-md">
    <h3 class="text-3xl mb-8">
      Register
    </h3>

    <MessageBox
      v-if="error"
      class="mb-6 w-full"
      color="red"
    >
      {{ error.message }}
    </MessageBox>

    <form
      class="flex flex-col w-full space-y-3"
      @submit.prevent="submitForm"
    >
      <BaseInput
        v-model="username"
        placeholder="Username"
        type="text"
        name="username"
        autofocus
      />
      <BaseInput
        v-model="password"
        placeholder="Password"
        type="password"
        name="password"
      />
      <BaseButton type="submit">
        Create account
      </BaseButton>
    </form>
  </div>
</template>
