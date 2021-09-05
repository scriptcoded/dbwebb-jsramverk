<script setup lang="ts">
import NavBar from './components/NavBar.vue'

</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-16">
    <NavBar />

    <div class="max-w-5xl mx-auto pt-8 px-4">
      <router-view />
    </div>
  </div>
</template>
