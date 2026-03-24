<!-- File: DownloadsArchive.vue -->
<template>
  <main class="max-w-3xl mx-auto px-6 py-12 space-y-6">
    <h1 class="text-2xl font-bold">Release Archive</h1>
    <p>All versions of NumStore.</p>

    <div v-if="loading" class="text-gray-600">Loading releases...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else-if="releases.length > 0" class="space-y-8">
      <div v-for="release in releases" :key="release.version" class="border-b pb-6">
        <h2 class="text-xl font-semibold mb-3">
          Version {{ release.version }}
          <span v-if="release === releases[0]" class="text-sm font-normal text-green-600 ml-2">(Latest)</span>
        </h2>

        <!-- Library Files -->
        <section v-if="release.library.length > 0" class="mb-4">
          <h3 class="font-medium mb-2">Library</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li v-for="file in release.library" :key="file.path">
              <a :href="`/${file.path}`" class="underline text-blue-600 hover:text-blue-800">
                {{ file.name }}
              </a>
              <span class="text-sm text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
            </li>
          </ul>
        </section>

        <!-- Documentation -->
        <section v-if="release.docs.length > 0" class="mb-4">
          <h3 class="font-medium mb-2">Documentation</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li v-for="file in release.docs" :key="file.path">
              <a :href="`/${file.path}`" class="underline text-blue-600 hover:text-blue-800" target="_blank">
                {{ file.name }}
              </a>
              <span class="text-sm text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
            </li>
          </ul>
        </section>

        <!-- Artifacts -->
        <section v-if="release.artifacts.length > 0" class="mb-4">
          <h3 class="font-medium mb-2">Additional Tools</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li v-for="file in release.artifacts" :key="file.path">
              <a :href="`/${file.path}`" class="underline text-blue-600 hover:text-blue-800">
                {{ file.name }}
              </a>
              <span class="text-sm text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <p class="pt-4 border-t">
      Back to <a class="underline text-blue-600" href="/downloads/current">current release</a>.
    </p>
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
const releases = ref<Release[]>([]);

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
      releases.value = manifest.releases;
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