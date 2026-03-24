<script lang="ts" setup>
import { RouterLink } from 'vue-router'

const values = [
  'Simplicity over complexity',
  'Reliability and correctness first',
  'Transparent, predictable APIs',
  'Sustainable long-term maintenance',
]

const timeline = [
  { when: '2025', what: 'Initial public releases of NumStore; early adopter programme' },
  { when: '2026', what: 'Planned LTS branch and expanded language integrations' },
]
</script>

<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-10">

    <section class="space-y-2">
      <h1 class="text-3xl font-bold">About NumStore</h1>
      <p class="text-gray-700">
        NumStore is a numeric-first embedded database built for systems workloads. It exposes a simple
        key/value interface over an R+ tree core and ships with a write-ahead log, Python bindings,
        and Java bindings.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Values</h2>
      <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li v-for="v in values" :key="v">{{ v }}</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Timeline</h2>
      <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li v-for="t in timeline" :key="t.when">
          <strong>{{ t.when }}:</strong> {{ t.what }}
        </li>
      </ul>
    </section>

    <section class="space-y-2">
      <h2 class="text-xl font-semibold">Contact</h2>
      <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li>General: <a class="underline" href="mailto:hello@numstore.dev">hello@numstore.dev</a></li>
        <li>Security: <a class="underline" href="mailto:security@numstore.dev">security@numstore.dev</a></li>
        <li><RouterLink class="underline" to="/about/contact">Contact form &amp; interest sign-up</RouterLink></li>
      </ul>
    </section>

  </main>
</template>
