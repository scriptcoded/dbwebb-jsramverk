<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/auth'
import BaseButton from './BaseButton.vue'

const { user, logout } = useAuth()
const router = useRouter()

const triggerLogout = async () => {
  await logout()
  router.push('/login')
}

</script>

<template>
  <div class="fixed top-0 left-0 w-screen border-b-4 border-indigo-500 shadow-md h-16 flex justify-between items-center px-4 space-x-3">
    <router-link
      to="/"
      class="flex justify-center items-center text-indigo-500 font-light text-3xl font-display"
    >
      Realtime Text
    </router-link>

    <div
      v-if="!user"
      class="flex items-center space-x-3"
    >
      <BaseButton to="/login">
        Sign in
      </BaseButton>

      <BaseButton to="/register">
        Create account
      </BaseButton>
    </div>
    <div
      v-else
      class="flex items-center space-x-3"
    >
      <BaseButton @click="triggerLogout">
        Sign out
      </BaseButton>
    </div>
  </div>
</template>
