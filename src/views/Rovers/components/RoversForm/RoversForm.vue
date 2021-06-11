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
import { IRoverFormData } from '../../interfaces/rover-form-data';

import { IRoverData } from '../../interfaces/rover-data';

export default Vue.extend({
  name: 'RoversForm',
  components: { Loader, InputField, UiButton },
  data: (): IRoverData => ({
    date: '',
    camera: '',
    id: uuid(),
    roverCameras: [],
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
  },
  watch: {
    date() {
      const erthDatePhotos = this.roverManifest?.photo_manifest.photos.find((photo) => photo.earth_date === this.date);

      this.roverCameras = erthDatePhotos ? erthDatePhotos.cameras : [];
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
      this.fetchPhotos(reqData).finally(() => {
        this.$v.$reset();
      });
    },
    resetForm(): void {
      this.$v.$reset();
      this.camera = '';
      this.date = '';
    },
    ...mapActions({
      fetchManifest: 'fetchRoverManifestWithStorage',
      fetchPhotos: 'fetchRoverPhotos',
    }),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchManifest();
    this.resetForm();
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
