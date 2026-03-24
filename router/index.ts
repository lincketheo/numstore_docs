/**
 * Application router.
 * LOCATION IN PROJECT: src/router/index.ts
 * (This file lives in the numstore_docs views repo; move it to src/router/ when integrating.)
 */
import { createRouter, createWebHistory } from 'vue-router'

import Current              from '@/views/downloads/Current.vue'
import Archive              from '@/views/downloads/Archive.vue'
import ResourcesDocumentation from '@/views/resources/ResourcesDocumentation.vue'
import BlogIndex            from '@/views/resources/BlogIndex.vue'
import BlogPostPage         from '@/views/resources/BlogPostPage.vue'
import ReferencesMain       from '@/views/resources/ReferencesMain.vue'
import Company              from '@/views/about/Company.vue'
import AboutContact         from '@/views/about/AboutContact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/',                          redirect: '/resources/documentation' },

    // Downloads
    { path: '/downloads',                 redirect: '/downloads/current' },
    { path: '/downloads/current',         component: Current },
    { path: '/downloads/archive',         component: Archive },

    // Resources
    { path: '/resources',                 redirect: '/resources/documentation' },
    { path: '/resources/documentation',   component: ResourcesDocumentation },
    { path: '/resources/blog',            component: BlogIndex },
    { path: '/resources/blog/:slug',      component: BlogPostPage },
    { path: '/resources/references',      component: ReferencesMain },

    // About
    { path: '/about',                     redirect: '/about/company' },
    { path: '/about/company',             component: Company },
    { path: '/about/contact',             component: AboutContact },

    // Catch-all → docs
    { path: '/:pathMatch(.*)*',           redirect: '/resources/documentation' },
  ],
})

export default router
