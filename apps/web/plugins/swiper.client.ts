import { defineNuxtPlugin } from '#app'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('Swiper', Swiper)
    nuxtApp.vueApp.component('SwiperSlide', SwiperSlide)
    
    // Make modules available globally
    nuxtApp.provide('swiperModules', {
        Navigation,
        Pagination,
        Autoplay,
        EffectFade,
    })
})