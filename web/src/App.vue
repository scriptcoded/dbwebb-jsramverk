<script setup lang="ts">
import NavBar from './components/NavBar.vue'

</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-16">
    <NavBar />

    <router-view />
  </div>
</template>
