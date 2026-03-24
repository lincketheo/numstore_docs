<script lang="ts" setup>
import manifest from './blog_entries/manifest.json'

// Manifest is already sorted newest-first; nothing else needed.
const posts = manifest
</script>

<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-8">
    <h1 class="text-3xl font-bold">NumStore Blog</h1>
    <p class="text-gray-600">
      Release notes, internals deep-dives, and performance notes.
    </p>

    <ul class="space-y-6 divide-y">
      <li v-for="post in posts" :key="post.slug" class="pt-6 first:pt-0 space-y-1">
        <div class="flex items-baseline gap-3">
          <RouterLink
            :to="`/resources/blog/${post.slug}`"
            class="text-lg font-semibold underline hover:text-gray-600"
          >
            {{ post.title }}
          </RouterLink>
          <span class="text-sm text-gray-500 shrink-0">{{ post.date }}</span>
        </div>
        <p class="text-gray-700 text-sm">{{ post.summary }}</p>
      </li>
    </ul>
  </main>
</template>
