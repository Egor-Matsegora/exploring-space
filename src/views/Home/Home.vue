<template src="./Home.html"></template>

<style lang="sass" src="./Home.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import SwiperCore, { EffectFade, Navigation, Pagination, SwiperOptions } from 'swiper/core';

import { TRootState } from '@/store/types';
import Loader from '@/components/Loader/Loader.vue';

SwiperCore.use([EffectFade, Navigation, Pagination]);

interface IHomeData {
  swiperOptions: SwiperOptions;
  swiperInterval: number;
  intervalId: number | null;
}

export default Vue.extend({
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
    Loader,
  },
  data(): IHomeData {
    return {
      swiperOptions: {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
      } as SwiperOptions,
      swiperInterval: 20000,
      intervalId: null,
    };
  },
  methods: {
    ...mapActions(['fetchMainSliderDataWithStorage', 'fetchMainSliderData']),
    setIntervalForSwiperAutoplay(): void {
      if (!this.mainSliderLoading) {
        this.startSliderInterval();
      } else {
        this.clearSliderInterval();
      }
    },
    startSliderInterval(): void {
      this.intervalId = setInterval(() => {
        this.$refs.swiperRef && (this.$refs.swiperRef as any).$swiper.slideNext(1700);
      }, this.swiperInterval);
    },
    clearSliderInterval(): void {
      this.intervalId && clearInterval(this.intervalId);
      this.intervalId = null;
    },
  },
  computed: {
    ...mapState({
      mainSliderData(state: TRootState) {
        return state.home.mainSliderData;
      },
      mainSliderLoading(state: TRootState) {
        return state.home.mainSliderLoading;
      },
    }),
  },
  watch: {
    mainSliderLoading() {
      this.setIntervalForSwiperAutoplay();
    },
  },
  created() {
    this.fetchMainSliderDataWithStorage();
  },
  mounted() {
    this.setIntervalForSwiperAutoplay();
  },
});
</script>
