<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
</script>

<template>
  <div class="mx-auto flex flex-col items-left">
    <h1 class="text-xl">The Bookstore</h1>
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Books</template>

      <a href="/books">Books</a> list
    </WelcomeItem>

  </div>
</template>