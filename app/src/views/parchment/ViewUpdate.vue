<template>
  <Suspense>
    <Update />

    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script setup lang="ts">
import Update from "@/components/parchment/ParchmentUpdate.vue";
</script>
