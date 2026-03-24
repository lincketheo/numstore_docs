<script lang="ts" setup>
import InterestForm from './InterestForm.vue'
</script>

<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-10">

    <section class="space-y-2">
      <h1 class="text-3xl font-bold">Contact</h1>
      <p class="text-gray-700">
        General inquiries, support questions, or security reports — pick the right channel below.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Direct contact</h2>
      <ul class="list-disc pl-6 space-y-1 text-gray-700">
        <li>General: <a class="underline" href="mailto:hello@numstore.dev">hello@numstore.dev</a></li>
        <li>Support: <a class="underline" href="mailto:support@numstore.dev">support@numstore.dev</a></li>
        <li>Security: <a class="underline" href="mailto:security@numstore.dev">security@numstore.dev</a></li>
      </ul>
    </section>

    <InterestForm />

  </main>
</template>
