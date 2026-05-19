export default defineNuxtPlugin({
  name: 'motionone',
  setup(nuxtApp) {
    if (import.meta.client) {
      // Only import and register Motion on client side
      import('@motionone/vue').then(({ Motion }) => {
        nuxtApp.vueApp.component('Motion', Motion)
      })
    } else {
      // Create a stub component for SSR that doesn't animate
      const MotionSSR = defineComponent({
        name: 'Motion',
        props: {
          tag: { type: String, default: 'div' },
          initial: Object,
          animate: Object,
          exit: Object,
          transition: Object,
          layout: [Boolean, String],
          layoutId: String
        },
        setup(props, { slots, attrs }) {
          return () => h(props.tag || 'div', attrs, slots.default?.())
        }
      })
      
      nuxtApp.vueApp.component('Motion', MotionSSR)
    }
  }
})