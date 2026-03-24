<!--
  Inline citation component.

  Usage:
    <Ref id="guttman84" />          → renders [Guttman 1984] linked to /resources/references#guttman84
    <Ref id="mohan92" />            → renders [Mohan et al. 1992]

  Import anywhere:
    import Ref from '@/views/resources/Ref.vue'
    (or use the path appropriate for your project layout)
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import allRefs from './references.json'

const props = defineProps<{ id: string }>()

const ref_ = computed(() => allRefs.find(r => r.id === props.id))
</script>

<template>
  <RouterLink
    v-if="ref_"
    :to="`/resources/references#${id}`"
    class="text-blue-700 hover:underline font-medium"
    :title="ref_.title"
  >[{{ ref_.label }}]</RouterLink>
  <span v-else class="text-red-600 font-medium" :title="`Unknown reference id: ${id}`">[?{{ id }}]</span>
</template>
