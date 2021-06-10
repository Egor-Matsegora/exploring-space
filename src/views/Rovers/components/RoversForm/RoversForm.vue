<template src="./RoversForm.html"></template>
<style lang="sass" src="./RoversForm.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { v4 as uuid } from 'uuid';

import Loader from '@/components/Loader/Loader.vue';
import InputField from '@/components/InputField/InputField.vue';
import { TRootState } from '@/store/types';
import { TRoversState } from '@/store/modules/rovers/types';
import { IRoverManifest } from '../../interfaces/rover-manifest';
import { roverMap } from '../../rover-maps';

export default Vue.extend({
  name: 'RoversForm',
  components: { Loader, InputField },
  data() {
    return {
      date: '',
      camera: '',
      id: uuid(),
    };
  },
  computed: {
    ...mapState({
      loading(state: TRootState): boolean {
        return (state.rovers as TRoversState).manifestLoading;
      },
      roverManifest(state: TRootState): IRoverManifest | null {
        return (state.rovers as TRoversState).roverManifest;
      },
      activeRover(state: TRootState): string {
        return (state.rovers as TRoversState).activeRover;
      },
    }),
    roverCameras() {
      const rover = roverMap.find((rover) => rover.name === this.activeRover);
      return rover ? rover.cameras : [];
    },
  },
  methods: {
    handleSubmit: () => {
      console.log('handleSubmit');
    },
    ...mapActions(['fetchRoverManifestWithStorage']),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchRoverManifestWithStorage();
    next();
  },
  beforeMount() {
    this.fetchRoverManifestWithStorage();
  },
  filters: {
    dateToString(value: string): string {
      return value.split('-').reverse().join('. ');
    },
  },
});
</script>
