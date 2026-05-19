import { computed, watch } from 'vue'
import { useStore } from '#shared/store/useStore'

export function useTheme() {
  const store = useStore()

  const mode = computed(() => store.state.theme.mode)
  const isDark = computed(() => mode.value === 'dark')

  function toggle() {
    store.dispatch('theme/toggle')
  }

  function setMode(m: 'light' | 'dark') {
    store.dispatch('theme/setMode', m)
  }

  // Sync to DOM and localStorage
  if (import.meta.client) {
    watch(mode, (val) => {
      document.documentElement.setAttribute('data-theme', val)
      localStorage.setItem('theme', val)
    }, { immediate: true })
  }

  return { mode, isDark, toggle, setMode }
}
