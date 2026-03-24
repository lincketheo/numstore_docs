<script lang="ts" setup>
import allRefs from './references.json'
</script>

<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-8">
    <section class="space-y-2">
      <h1 class="text-3xl font-bold">References</h1>
      <p class="text-gray-600 text-sm">
        Academic papers and technical resources that informed NumStore's design. Inline citations
        throughout the docs and blog link back here.
      </p>
    </section>

    <ol class="space-y-6">
      <li
        v-for="ref in allRefs"
        :key="ref.id"
        :id="ref.id"
        class="scroll-mt-20 border-l-4 border-gray-200 pl-4 space-y-1"
      >
        <div class="font-semibold">
          <a
            v-if="ref.url"
            :href="ref.url"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-gray-600"
          >{{ ref.title }}</a>
          <span v-else>{{ ref.title }}</span>
        </div>

        <div class="text-sm text-gray-600">
          {{ ref.authors.join(', ') }} &mdash; <em>{{ ref.venue }}</em>, {{ ref.year }}
        </div>

        <div v-if="ref.notes" class="text-sm text-gray-500 italic">
          {{ ref.notes }}
        </div>

        <div class="text-xs text-gray-400 font-mono">
          [{{ ref.label }}]
        </div>
      </li>
    </ol>
  </main>
</template>
