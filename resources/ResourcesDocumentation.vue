<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const docHtml = ref<string>('');
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('/docs/index.html');
    if (!response.ok) {
      throw new Error(`Failed to load documentation: ${response.statusText}`);
    }
    const html = await response.text();
    docHtml.value = html;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load documentation';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="w-full mx-auto">
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Loading documentation...</p>
    </div>
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>
    <div v-else class="docs-container">
      <iframe
        :srcdoc="docHtml"
        class="w-full min-h-screen border-0"
        title="Documentation"
        sandbox="allow-same-origin allow-popups"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.docs-container {
  width: 100%;
}

iframe {
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
