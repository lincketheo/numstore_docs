<!-- File: DownloadsCurrent.vue -->
<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-6">
    <h1 class="text-2xl font-bold">Download NumStore</h1>

    <div v-if="loading" class="text-gray-600">Loading releases...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else-if="currentRelease">
      <p class="mb-6">Current stable release: <strong>v{{ currentRelease.version }}</strong></p>

      <!-- Library Files -->
      <section v-if="currentRelease.library.length > 0" class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Library</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="file in currentRelease.library" :key="file.path">
            <a :href="`/${file.path}`" class="underline text-blue-600 hover:text-blue-800">
              {{ file.name }}
            </a>
            <span class="text-sm text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
          </li>
        </ul>
      </section>

      <!-- Documentation -->
      <section v-if="currentRelease.docs.length > 0" class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Documentation</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="file in currentRelease.docs" :key="file.path">
            <a :href="`/${file.path}`" class="underline text-blue-600 hover:text-blue-800" target="_blank">
              {{ file.name }}
            </a>
            <span class="text-sm text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
          </li>
        </ul>
      </section>

      <!-- Artifacts -->
      <section v-if="currentRelease.artifacts.length > 0" class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Additional Tools</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="file in currentRelease.artifacts" :key="file.path">
            <a :href="`/${file.path}`" class="underline text-blue-600 hover:text-blue-800">
              {{ file.name }}
            </a>
            <span class="text-sm text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
          </li>
        </ul>
      </section>

      <p class="pt-4 border-t">
        Looking for older versions? <a class="underline text-blue-600" href="/downloads/archive">Visit the archive</a>.
      </p>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface FileInfo {
  name: string;
  path: string;
  size: number;
  modified: string;
}

interface Release {
  version: string;
  library: FileInfo[];
  docs: FileInfo[];
  artifacts: FileInfo[];
}

interface ReleasesManifest {
  generated_at: string;
  total_releases: number;
  latest_version: string;
  releases: Release[];
}

const loading = ref(true);
const error = ref<string | null>(null);
const currentRelease = ref<Release | null>(null);

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

onMounted(async () => {
  try {
    const response = await fetch('/releases.json');
    if (!response.ok) {
      throw new Error(`Failed to load releases: ${response.statusText}`);
    }
    const manifest: ReleasesManifest = await response.json();

    if (manifest.releases && manifest.releases.length > 0) {
      currentRelease.value = manifest.releases[0]; // First one is the latest
    } else {
      error.value = 'No releases found';
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load releases';
  } finally {
    loading.value = false;
  }
});
</script>