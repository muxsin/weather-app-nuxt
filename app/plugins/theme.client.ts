import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Prevent FOUC: read saved theme before first paint
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const mode = saved ?? (prefersDark ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', mode)
})
