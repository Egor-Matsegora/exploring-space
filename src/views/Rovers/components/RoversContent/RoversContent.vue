<template src="./RoversContent.html"></template>
<style lang="sass" src="./RoversContent.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';
import VueEasyLightbox from 'vue-easy-lightbox';

import Loader from '@/components/Loader/Loader.vue';
import { TRootState } from '@/store/types';
import { TRoversState } from '@/store/modules/rovers/types';
import { IRoverPhoto } from '../../interfaces/rover-photo';

export default Vue.extend({
  name: 'RoversContent',
  components: {
    Loader,
    VueEasyLightbox,
  },
  data: () => ({
    imageIndex: 0,
    visible: false,
  }),
  computed: {
    ...mapState({
      loading(state: TRootState): boolean {
        return (state.rovers as TRoversState).imagesLoading;
      },
      photos(state: TRootState): IRoverPhoto[] | [] {
        return (state.rovers as TRoversState).roverPhotos;
      },
    }),
    ...mapGetters({
      imgs: 'photoUrls',
    }),
  },
  methods: {
    handleHide(): void {
      this.visible = false;
    },
    openGalery(i: number): void {
      this.visible = true;
      this.imageIndex = i;
    },
  },
});
</script>
