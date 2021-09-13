<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>

<template>
  <div class="flex flex-col items-center pt-24">
    <h1 class="text-3xl mb-6">
      You must be signed in to access the editor
    </h1>

    <div class="flex justify-center w-full space-x-3">
      <BaseButton to="/login">
        Sign in
      </BaseButton>

      <BaseButton to="/register">
        Create account
      </BaseButton>
    </div>
  </div>
</template>
