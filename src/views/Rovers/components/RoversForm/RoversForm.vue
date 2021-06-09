<template src="./RoversForm.html"></template>
<style lang="sass" src="./RoversForm.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

import Loader from '@/components/Loader/Loader.vue';
import { TRootState } from '@/store/types';
import { TRoversState } from '@/store/modules/rovers/types';
import { IRoverManifest } from '../../interfaces/rover-manifest';

export default Vue.extend({
  name: 'RoversForm',
  components: { Loader },
  computed: {
    ...mapState({
      loading(state: TRootState): boolean {
        return (state.rovers as TRoversState).manifestLoading;
      },
      roverManifest(state: TRootState): IRoverManifest | null {
        return (state.rovers as TRoversState).roverManifest;
      },
    }),
  },
  methods: {
    ...mapActions(['fetchRoverManifestWithStorage']),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchRoverManifestWithStorage();
    next();
  },
  beforeMount() {
    // this.fetchRoverManifestWithStorage();
  },
});
</script>
