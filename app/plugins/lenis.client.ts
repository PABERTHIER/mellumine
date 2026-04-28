import Lenis from 'lenis'

declare module '#app' {
  interface NuxtApp {
    $lenis?: Lenis
  }
}

export default defineNuxtPlugin(nuxtApp => {
  if (import.meta.server) return

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (prefersReduced) return

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  let rafId: number
  const raf = (time: number) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  nuxtApp.hook('page:finish', () => {
    lenis.scrollTo(0, { immediate: true })
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    })
  }

  nuxtApp.provide('lenis', lenis)
})
