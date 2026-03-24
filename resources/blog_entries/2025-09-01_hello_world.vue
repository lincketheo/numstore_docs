<template>
  <article class="prose max-w-3xl mx-auto px-6 py-12">
    <h1>Hello, world</h1>
    <p class="text-gray-500 text-sm">2025-09-01</p>
    <p>
      NumStore now has a tiny blog! This is a short hello and a note on what to expect: concise posts
      focused on releases, performance notes, and low-level implementation details.
    </p>
    <p>
      Future posts will cover the WAL internals, JNI bindings, and how we compare to columnar engines
      for numeric workloads.
    </p>
  </article>
</template>

<script lang="ts">
export const meta = { title: 'Hello, world', date: '2025-09-01' }
export const summary = 'NumStore now has a blog. Expect concise posts on releases, performance notes, and low-level internals.'
</script>
