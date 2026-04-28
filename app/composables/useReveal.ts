export const useReveal = () => {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)

  onMounted(() => {
    if (!el.value) return
    if (typeof IntersectionObserver === 'undefined') {
      visible.value = true
      return
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible.value = true
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el.value)
    onBeforeUnmount(() => obs.disconnect())
  })

  return { el, visible }
}
