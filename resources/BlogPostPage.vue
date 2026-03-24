<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const modules = import.meta.glob(
  '/src/views/resources/blog_entries/*.vue',
  { eager: true }
) as Record<string, { default?: any }>

const bySlug: Record<string, { default?: any }> = {}
for (const path in modules) {
  const slug = path.split('/').pop()!.replace(/\.vue$/, '')
  bySlug[slug] = modules[path]
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const Resolved = computed(() => bySlug[slug.value]?.default ?? null)
</script>

<template>
  <main class="max-w-3xl mx-auto px-6 py-12">
    <component :is="Resolved" v-if="Resolved" :key="slug" />
    <div v-else class="space-y-4">
      <h1 class="text-2xl font-bold">Post not found</h1>
      <p class="text-gray-700">This post could not be located.</p>
      <RouterLink class="underline" to="/resources/blog">← Back to blog</RouterLink>
    </div>
  </main>
</template>
