<template src="./RoversForm.html"></template>
<style lang="sass" src="./RoversForm.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { v4 as uuid } from 'uuid';

import Loader from '@/components/Loader/Loader.vue';
import InputField from '@/components/InputField/InputField.vue';
import UiButton from '@/components/UiButton/UiButton.vue';
import { TRootState } from '@/store/types';
import { TRoversState } from '@/store/modules/rovers/types';
import { IRoverManifest } from '../../interfaces/rover-manifest';
import { roverMap } from '../../rover-maps';
import { IRoverFormData } from '../../interfaces/rover-form-data';

export default Vue.extend({
  name: 'RoversForm',
  components: { Loader, InputField, UiButton },
  data: () => ({
    date: '',
    camera: '',
    id: uuid(),
  }),
  validations: {
    date: { required },
    camera: { required },
  },
  computed: {
    ...mapState({
      loading(state: TRootState): boolean {
        return (state.rovers as TRoversState).manifestLoading;
      },
      photosLoading(state: TRootState): boolean {
        return (state.rovers as TRoversState).imagesLoading;
      },
      roverManifest(state: TRootState): IRoverManifest | null {
        return (state.rovers as TRoversState).roverManifest;
      },
      activeRover(state: TRootState): string {
        return (state.rovers as TRoversState).activeRover;
      },
    }),
    roverCameras(): string[] | [] {
      const rover = roverMap.find((rover) => rover.name === this.activeRover);
      return rover ? rover.cameras : [];
    },
  },
  methods: {
    handleSubmit(): void {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      const reqData: IRoverFormData = {
        date: this.date,
        camera: this.camera,
        roverName: this.activeRover,
      };
      this.fetchPhotos(reqData);
    },
    ...mapActions({
      fetchManifest: 'fetchRoverManifestWithStorage',
      fetchPhotos: 'fetchRoverPhotos',
    }),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchManifest();
    next();
  },
  beforeMount() {
    this.fetchManifest();
  },
  filters: {
    dateToString(value: string): string {
      return value.split('-').reverse().join('. ');
    },
  },
});
</script>
