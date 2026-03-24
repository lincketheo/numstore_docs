<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import NavBarEntry from './NavBarEntry.vue'

const downloads = [
  { text: 'Current',  href: '/downloads/current' },
  { text: 'Archive',  href: '/downloads/archive'  },
]

const resources = [
  { text: 'Documentation', href: '/resources/documentation' },
  { text: 'Blog',          href: '/resources/blog'          },
  { text: 'References',    href: '/resources/references'    },
]

const about = [
  { text: 'Company', href: '/about/company' },
  { text: 'Contact', href: '/about/contact' },
]
</script>

<template>
  <nav class="bg-blue-400 text-white text-sm">
    <div class="max-w-7xl mx-auto px-4 flex items-center gap-1">
      <RouterLink to="/" class="px-3 py-3 font-semibold tracking-wide hover:bg-blue-300 transition-colors">
        NumStore
      </RouterLink>

      <NavBarEntry
        label="Downloads"
        :items="downloads"
        bg-class="bg-blue-400"
        group-hover-class="hover:bg-blue-300"
        item-hover-class="hover:bg-blue-500"
      />

      <NavBarEntry
        label="Resources"
        :items="resources"
        bg-class="bg-blue-400"
        group-hover-class="hover:bg-blue-300"
        item-hover-class="hover:bg-blue-500"
      />

      <NavBarEntry
        label="About"
        :items="about"
        bg-class="bg-blue-400"
        group-hover-class="hover:bg-blue-300"
        item-hover-class="hover:bg-blue-500"
      />
    </div>
  </nav>
</template>
