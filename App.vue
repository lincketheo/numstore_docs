<!--
  Root application component.
  LOCATION IN PROJECT: src/App.vue
  (This file lives in the numstore_docs views repo; move it up to src/ when integrating.)
-->
<script lang="ts" setup>
import NavBar    from '@/views/nav/NavBar.vue'
import NavFooter from '@/views/nav/NavFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <div class="flex-1">
      <RouterView />
    </div>
    <NavFooter />
  </div>
</template>
