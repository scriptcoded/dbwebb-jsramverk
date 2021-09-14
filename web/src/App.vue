<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import { useAuth } from './composables/auth'

const { getUser } = useAuth()

const loaded = ref(false)

const loadUser = async () => {
  await getUser()
  loaded.value = true
}
onMounted(loadUser)
</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-16">
    <NavBar />

    <div
      v-if="!loaded"
      class="flex justify-center items-center h-48 text-xl"
    >
      Loading...
    </div>
    <router-view v-else />
  </div>
</template>
